#!/bin/bash
# ============================================================================
#  bootstrap-server.sh — cài đặt TennisHub LẦN ĐẦU trên một máy Ubuntu mới.
#
#  Dùng cho: dựng lại máy chủ khi laptop ở nhà hỏng / đổi máy (disaster recovery).
#  KHÔNG dùng để deploy code — việc đó là deploy/deploy.ps1.
#
#  Chạy trên server, bằng user thường có quyền sudo:
#      bash bootstrap-server.sh
#
#  Điều kiện: Ubuntu, đã có Node.js >= 20 và PostgreSQL >= 14 (script chỉ kiểm tra, không tự cài).
#  Script sẽ hỏi mật khẩu sudo. Sau khi chạy xong, đọc phần "VIỆC CÒN LẠI" ở cuối.
#
#  ⚠️  Script TỪ CHỐI chạy nếu server/.env đã tồn tại (tránh ghi đè secret thật).
#      Muốn ghi đè thật sự thì đặt FORCE=1.
# ============================================================================
set -euo pipefail

APP="${APP_DIR:-$HOME/apps/tennishub}"
DB_NAME="booking_tenis"
DB_USER="tennishub"
PW_FILE="$HOME/.tennishub_db_pw"
ENV_FILE="$APP/server/.env"
PUBLIC_HOSTNAME="${PUBLIC_HOSTNAME:-tennishub}"

step() { echo; echo "=== $* ==="; }
ok()   { echo "[+] $*"; }
warn() { echo "[!] $*"; }
die()  { echo "[x] $*" >&2; exit 1; }

# ------------------------------------------------------------ 0. điều kiện
step "0. Kiem tra dieu kien"
[ "$(id -u)" -ne 0 ] || die "Dung chay bang root — hay chay bang user thuong co quyen sudo."
command -v sudo >/dev/null || die "Thieu sudo."
command -v node >/dev/null || die "Chua cai Node.js (>= 20)."
command -v npm >/dev/null  || die "Chua cai npm."
command -v psql >/dev/null || die "Chua cai PostgreSQL (apt install postgresql)."
command -v curl >/dev/null || die "Thieu curl."

NODE_MAJOR="$(node -v | sed 's/v\([0-9]*\).*/\1/')"
[ "$NODE_MAJOR" -ge 20 ] || die "Node $(node -v) qua cu, can >= 20."
ok "node $(node -v)"

if sudo -n true 2>/dev/null; then
  ok "sudo khong can mat khau"
else
  warn "sudo se hoi mat khau vai lan trong qua trinh cai"
fi

if [ -f "$ENV_FILE" ] && [ "${FORCE:-0}" != "1" ]; then
  die "$ENV_FILE da ton tai — script nay chi de cai lan dau. Dat FORCE=1 neu that su muon ghi de."
fi

# ---------------------------------------------------------------- 1. pnpm
step "1. pnpm (khong can sudo)"
mkdir -p "$HOME/.local/bin" "$HOME/.local"
export PATH="$HOME/.local/bin:$PATH"

if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable --install-directory "$HOME/.local/bin" 2>/dev/null || true
fi
if ! command -v pnpm >/dev/null 2>&1 || ! pnpm --version >/dev/null 2>&1; then
  npm config set prefix "$HOME/.local" >/dev/null
  npm install -g pnpm@11
fi
ok "pnpm $(pnpm --version)  ($(command -v pnpm))"

# --------------------------------------------------------------- 2. thư mục
step "2. Thu muc ung dung"
mkdir -p "$APP/server" "$APP/web"
ok "$APP/{server,web}"

# ------------------------------------------------- 3. role + database Postgres
step "3. Role va database PostgreSQL"
if [ -f "$PW_FILE" ]; then
  DB_PW="$(cat "$PW_FILE")"
  ok "dung lai mat khau trong $PW_FILE"
else
  DB_PW="$(openssl rand -hex 24)"
  printf '%s' "$DB_PW" > "$PW_FILE"
  chmod 600 "$PW_FILE"
  ok "sinh mat khau moi -> $PW_FILE (chmod 600)"
fi

if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
  sudo -u postgres psql -q -v ON_ERROR_STOP=1 -c "ALTER ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PW';"
  ok "cap nhat mat khau cho role $DB_USER"
else
  sudo -u postgres psql -q -v ON_ERROR_STOP=1 -c "CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PW';"
  ok "da tao role $DB_USER"
fi

if sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1; then
  ok "database $DB_NAME da ton tai"
else
  sudo -u postgres createdb -O "$DB_USER" "$DB_NAME"
  ok "da tao database $DB_NAME (owner=$DB_USER)"
fi

# ------------------------------------------------------------ 4. .env prod
step "4. File .env production"
JWT_SECRET="$(openssl rand -hex 48)"
SEPAY_KEY="$(openssl rand -hex 32)"

cat > "$ENV_FILE" <<EOF
# SINH TU DONG BOI bootstrap-server.sh — KHONG commit file nay.
DATABASE_URL="postgresql://${DB_USER}:${DB_PW}@127.0.0.1:5432/${DB_NAME}?schema=public"
PORT=4000
# Cap nhat them URL that sau khi bat Funnel.
CORS_ORIGIN="http://localhost:8081"
WEB_ROOT="${APP}/web"
JWT_SECRET="${JWT_SECRET}"
JWT_EXPIRES_IN="7d"

# SePay — THAY bang thong tin that khi co tai khoan.
# SEPAY_WEBHOOK_API_KEY phai duoc khai bao giong het trong dashboard SePay
# (header: Authorization: Apikey <key>).
SEPAY_ACCOUNT_NUMBER="THAY_THAT"
SEPAY_BANK_CODE="THAY_THAT"
SEPAY_ACCOUNT_NAME="THAY_THAT"
SEPAY_WEBHOOK_API_KEY="${SEPAY_KEY}"
SEPAY_QR_EXPIRES_MINUTES="15"
EOF
chmod 600 "$ENV_FILE"
ok "$ENV_FILE (chmod 600) — JWT ${#JWT_SECRET} ky tu, SePay key ${#SEPAY_KEY} ky tu"

# ------------------------------------------------------------------ 5. PM2
step "5. PM2"
if command -v pm2 >/dev/null 2>&1; then
  ok "pm2 $(pm2 -v)"
else
  npm install -g pm2
  ok "da cai pm2 $(pm2 -v)"
fi

if systemctl list-unit-files 2>/dev/null | grep -qi '^pm2-'; then
  ok "da co unit systemd cho pm2"
else
  sudo env "PATH=$PATH" pm2 startup systemd -u "$(id -un)" --hp "$HOME"
  ok "da tao unit systemd cho pm2"
fi

# -------------------------------------------------------------- 6. Tailscale
step "6. Tailscale"
if command -v tailscale >/dev/null 2>&1; then
  ok "tailscale $(tailscale version | head -1)"
else
  curl -fsSL https://tailscale.com/install.sh | sudo sh
  ok "da cai tailscale"
fi

# ------------------------------------------------------------ 7. chay 24/7
step "7. Chan may ngu (yeu cau chay 24/7)"
sudo systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
if grep -q '^HandleLidSwitch=' /etc/systemd/logind.conf; then
  sudo sed -i 's/^HandleLidSwitch=.*/HandleLidSwitch=ignore/' /etc/systemd/logind.conf
else
  echo 'HandleLidSwitch=ignore' | sudo tee -a /etc/systemd/logind.conf >/dev/null
fi
ok "da mask sleep/suspend/hibernate va bo qua khi gap nap may"
warn "config logind chi co hieu luc sau khi REBOOT"

# --------------------------------------------------------------- kết thúc
cat <<EOF

================================ VIỆC CÒN LẠI ================================

1) Dang nhap Tailscale (in ra URL, mo bang trinh duyet de xac thuc):
       sudo tailscale up --hostname=${PUBLIC_HOSTNAME}

2) Trong admin console Tailscale (https://login.tailscale.com/admin):
       - DNS      : bat MagicDNS + HTTPS Certificates
       - Access controls: them nodeAttrs cho phep Funnel:
           "nodeAttrs": [
             { "target": ["autogroup:member"], "attr": ["funnel"] }
           ]

3) Bat Funnel (443 -> NestJS):
       sudo tailscale funnel --bg --https=443 http://127.0.0.1:4000

4) Lay URL cong khai roi cap nhat CORS_ORIGIN trong:
       ${ENV_FILE}
   thanh "https://<ten-may>.<tailnet>.ts.net,..." roi:
       pm2 restart all --update-env   # (tren may chi co TennisHub thi dung lenh nay)
       pm2 save

5) Deploy code lan dau tu may dev:
       powershell -ExecutionPolicy Bypass -File deploy\\deploy.ps1

6) Vao BIOS tat "Deep Sleep" / "ErP" — day la thu duy nhat khong the cau hinh qua SSH,
   de may khong ngu sau khi mat dien.

7) REBOOT de ap dung cau hinh chan ngu.

Xem them: deploy/README.md
EOF

echo
echo "BOOTSTRAP_OK"
