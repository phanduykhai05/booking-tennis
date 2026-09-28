<#
.SYNOPSIS
    Build và deploy TennisHub lên server production (máy nhà 192.168.100.69).

.DESCRIPTION
    Chạy từ máy dev (Windows). Script KHÔNG chứa secret nào - mọi secret nằm trên server.
    Các bước:
      1. Typecheck client + server (bỏ qua bằng -SkipChecks)
      2. Build bản web tĩnh với EXPO_PUBLIC_API_URL=/api rồi copy client/public/* vào dist
      3. Kiểm tra bundle đã nhúng /api và không còn localhost:4000
      4. Đóng gói server/ (KHÔNG kèm .env) + client/dist, đẩy lên /tmp của server bằng scp
      5. Gửi deploy/remote-deploy.sh qua base64 và chạy trên server
         (server tự backup .env + pg_dump, giải nén, build, restart PM2, kiểm tra sức khoẻ)

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File deploy\deploy.ps1

.EXAMPLE
    # Chỉ deploy backend, giữ nguyên bản web đang chạy
    powershell -ExecutionPolicy Bypass -File deploy\deploy.ps1 -SkipWeb

.NOTES
    Máy server còn chạy `mocphim-api` của project khác - script không đụng tới process đó.
#>
[CmdletBinding()]
param(
    [string]$Server = '192.168.100.69',
    [switch]$SkipChecks,
    [switch]$SkipWeb,
    [switch]$SkipBackup
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$tmpDir = Join-Path $env:TEMP 'tennishub-deploy'
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

function Write-Step([string]$Message) {
    Write-Host ''
    Write-Host "=== $Message ===" -ForegroundColor Cyan
}
function Write-Ok([string]$Message) { Write-Host "[+] $Message" -ForegroundColor Green }
function Write-Warn([string]$Message) { Write-Host "[!] $Message" -ForegroundColor Yellow }
function Stop-Deploy([string]$Message) {
    Write-Host "[x] $Message" -ForegroundColor Red
    exit 1
}

# Lenh ngoai (npx, tar, scp, ssh) thuong ghi tien trinh ra stderr. Khi
# $ErrorActionPreference = 'Stop' thi PowerShell coi moi dong stderr la loi
# nghiem trong va dung script (vi du dong "npm notice" cua npx). Vi vay moi
# lenh ngoai phai di qua day: ha tam muc do loi, in nguyen van tien trinh,
# roi kiem tra ma thoat that su.
function Invoke-Native {
    param(
        [Parameter(Mandatory)][scriptblock]$Command,
        [Parameter(Mandatory)][string]$FailMessage
    )
    $previous = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & $Command 2>&1 | ForEach-Object { Write-Host $_ }
        $code = $LASTEXITCODE
    } finally {
        $ErrorActionPreference = $previous
    }
    if ($code -ne 0) { Stop-Deploy "$FailMessage (ma thoat $code)" }
}

# Nhu tren nhung tra ve ket qua thay vi in ra (dung cho tar -tzf).
function Get-NativeOutput {
    param([Parameter(Mandatory)][scriptblock]$Command)
    $previous = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        & $Command 2>&1
    } finally {
        $ErrorActionPreference = $previous
    }
}

Write-Host 'TennisHub deploy' -ForegroundColor White
Write-Host "  repo   : $repoRoot"
Write-Host "  server : $Server"

# --------------------------------------------------------------- 1. kiem tra
if ($SkipChecks) {
    Write-Warn 'Bo qua buoc typecheck (-SkipChecks)'
} else {
    Write-Step '1. Kiem tra typecheck'

    Push-Location (Join-Path $repoRoot 'client')
    try {
        Invoke-Native -FailMessage 'client typecheck that bai' -Command { & npx tsc --noEmit }
    } finally { Pop-Location }
    Write-Ok 'client typecheck OK'

    Push-Location (Join-Path $repoRoot 'server')
    try {
        Invoke-Native -FailMessage 'server typecheck that bai' -Command { & npx tsc --noEmit -p tsconfig.json }
    } finally { Pop-Location }
    Write-Ok 'server typecheck OK'
}

# ----------------------------------------------------------------- 2. build web
if ($SkipWeb) {
    Write-Warn 'Bo qua build web (-SkipWeb) - server giu nguyen ban web dang chay'
} else {
    Write-Step '2. Build ban web'
    Push-Location (Join-Path $repoRoot 'client')
    try {
        # Duong dan tuong doi de cung mot artifact chay duoc ca LAN lan URL cong khai.
        $env:EXPO_PUBLIC_API_URL = '/api'
        Invoke-Native -FailMessage 'expo export that bai' -Command {
            & npx expo export --platform web --output-dir dist
        }

        # public/ (manifest.json, apple-touch-icon, icon-*) phai de len dist moi nhat.
        Copy-Item '.\public\*' '.\dist\' -Recurse -Force

        $jsFile = Get-ChildItem '.\dist\_expo\static\js\web' -Filter '*.js' | Select-Object -First 1
        if (-not $jsFile) { Stop-Deploy 'Khong thay bundle JS trong dist/_expo/static/js/web' }
        $js = [IO.File]::ReadAllText($jsFile.FullName)

        if ($js.IndexOf('localhost:4000') -ge 0) {
            Stop-Deploy 'Bundle van chua localhost:4000 - tren dien thoai se bao "Khong ket noi duoc may chu"'
        }
        if ($js.IndexOf('"/api"') -lt 0) {
            Stop-Deploy 'Bundle khong chua "/api" - kiem tra bien EXPO_PUBLIC_API_URL'
        }
    } finally {
        Remove-Item Env:\EXPO_PUBLIC_API_URL -ErrorAction SilentlyContinue
        Pop-Location
    }
    Write-Ok 'Bundle nhung dung /api, khong con localhost:4000'
}

# --------------------------------------------------------------- 3. dong goi
Write-Step '3. Dong goi'
Push-Location $repoRoot
try {
    Invoke-Native -FailMessage 'tar server that bai' -Command {
        & tar -czf "$tmpDir\server.tgz" `
            --exclude node_modules --exclude dist --exclude .git --exclude .env --exclude .expo server
    }

    if (-not $SkipWeb) {
        Invoke-Native -FailMessage 'tar web that bai' -Command {
            & tar -czf "$tmpDir\web.tgz" -C client dist
        }
    }

    # Chan chat: secret KHONG duoc lot vao goi.
    $envInTar = @(Get-NativeOutput { & tar -tzf "$tmpDir\server.tgz" } | Select-String -Pattern '\.env$')
    if ($envInTar.Count -gt 0) {
        Stop-Deploy "tar dang chua .env ($($envInTar -join ', ')) - dung lai"
    }
} finally { Pop-Location }

$serverSize = (Get-Item "$tmpDir\server.tgz").Length
Write-Ok ("server.tgz: {0:N0} KB (khong chua .env)" -f ($serverSize / 1KB))
if (-not $SkipWeb) {
    $webSize = (Get-Item "$tmpDir\web.tgz").Length
    Write-Ok ("web.tgz: {0:N0} KB" -f ($webSize / 1KB))
}

# ------------------------------------------------------------------ 4. day len
Write-Step "4. Day len $Server"
$files = @("$tmpDir\server.tgz")
if (-not $SkipWeb) { $files += "$tmpDir\web.tgz" }

$scpArgs = @('-o', 'BatchMode=yes') + $files + @("${Server}:/tmp/")
Invoke-Native -FailMessage "scp that bai - kiem tra SSH key va ket noi toi $Server" -Command {
    & scp @scpArgs
}
Write-Ok 'da day len /tmp/ tren server'

# -------------------------------------------------------------- 5. chay remote
Write-Step '5. Trien khai tren server'
$remoteScript = Join-Path $PSScriptRoot 'remote-deploy.sh'
if (-not (Test-Path $remoteScript)) { Stop-Deploy "Khong thay $remoteScript" }

# base64 la cach duy nhat di qua PowerShell ma khong bi pha quote/CRLF.
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($remoteScript))

$envPrefix = ''
if ($SkipBackup) { $envPrefix += 'SKIP_BACKUP=1 ' }
if ($SkipWeb) { $envPrefix += 'SKIP_WEB=1 ' }

Invoke-Native -FailMessage 'Deploy tren server that bai - xem log phia tren' -Command {
    & ssh -o BatchMode=yes $Server "echo $b64 | base64 -d | ${envPrefix}bash"
}

Write-Host ''
Write-Host 'Deploy thanh cong.' -ForegroundColor Green
Write-Host '  Cong khai : https://tennishub.tail27319a.ts.net'
Write-Host '  LAN       : http://192.168.100.69:4000'
Write-Host ("  Log       : ssh {0} 'pm2 logs tennishub-api --lines 50'" -f $Server)
