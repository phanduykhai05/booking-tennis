#!/bin/bash
# ============================================================================
#  remote-deploy.sh — chay TREN SERVER production (khong chay o may dev).
#
#  Duoc deploy/deploy.ps1 gui qua:   echo <base64> | base64 -d | bash
#  Bien moi truong:
#     SKIP_BACKUP=1   bo qua pg_dump truoc khi deploy
#     SKIP_WEB=1      chi deploy backend, giu nguyen ban web dang chay
#
#  ⚠️  KHONG BAO GIO dung `pm2 restart all` / `pm2 delete all` / `pm2 flush`:
#      may nay con chay `mocphim-api` cua project khac.
# ============================================================================
set -euo pipefail

APP="$HOME/apps/tennishub"
SERVER_DIR="$APP/server"
PM2_NAME="tennishub-api"
PORT=4000
BASE_URL="http://127.0.0.1:${PORT}"
HEALTH_URL="${BASE_URL}/api/health"

SKIP_BACKUP="${SKIP_BACKUP:-0}"
SKIP_WEB="${SKIP_WEB:-0}"

export PATH="$HOME/.local/bin:$PATH"

step() { echo; echo "=== $* ==="; }
ok()   { echo "[+] $*"; }
die()  { echo "[x] $*" >&2; exit 1; }

# ---------------------------------------------------------------- 0. kiem tra
if [ ! -f /tmp/server.tgz ]; then
  die "Thieu /tmp/server.tgz — deploy.ps1 chua day len?"
fi
if [ "$SKIP_WEB" != "1" ] && [ ! -f /tmp/web.tgz ]; then
  die "Thieu /tmp/web.tgz — deploy.ps1 chua day len?"
fi
if [ ! -f "$SERVER_DIR/.env" ]; then
  die "Khong thay $SERVER_DIR/.env — may nay chua duoc cai dat. Chay bootstrap-server.sh truoc."
fi

step "0. Backup .env va database"
cp "$SERVER_DIR/.env" /tmp/tennishub.env.bak
ok "da backup .env"

if [ "$SKIP_BACKUP" = "1" ]; then
  echo "[i] bo qua backup DB (SKIP_BACKUP=1)"
else
  export PGPASSWORD="$(cat "$HOME/.tennishub_db_pw")"
  pg_dump -h 127.0.0.1 -U tennishub -d booking_tenis -Fc -f "$HOME/backup-before-deploy.dump"
  ok "da backup DB -> ~/backup-before-deploy.dump ($(du -h "$HOME/backup-before-deploy.dump" | cut -f1))"
fi

# ------------------------------------------------------- 1. giai nen + .env
step "1. Giai nen (giu nguyen .env production)"
rm -rf "$SERVER_DIR"
if [ "$SKIP_WEB" != "1" ]; then
  rm -rf "$APP/web"
fi

tar -xzf /tmp/server.tgz -C "$APP"
if [ "$SKIP_WEB" != "1" ]; then
  tar -xzf /tmp/web.tgz -C "$APP"
  mv "$APP/dist" "$APP/web"
fi

# Phuc hoi secret: tar KHONG chua .env nen phai copy lai tu backup.
cp /tmp/tennishub.env.bak "$SERVER_DIR/.env"
chmod 600 "$SERVER_DIR/.env"

rm -f /tmp/server.tgz /tmp/tennishub.env.bak
if [ "$SKIP_WEB" != "1" ]; then
  rm -f /tmp/web.tgz
fi

grep -q '^DATABASE_URL=' "$SERVER_DIR/.env" || die ".env thieu DATABASE_URL — dung lai de tranh mat secret"
grep -q '^JWT_SECRET='   "$SERVER_DIR/.env" || die ".env thieu JWT_SECRET — dung lai de tranh mat secret"

ok "server: $(find "$SERVER_DIR" -type f | wc -l) file"
if [ "$SKIP_WEB" != "1" ]; then
  ok "web: $(find "$APP/web" -type f | wc -l) file"
fi

# ---------------------------------------------------------- 2. cai + build
step "2. Cai dat va build"
cd "$SERVER_DIR"
command -v pnpm >/dev/null 2>&1 || die "Chua co pnpm trong PATH (~/.local/bin) — chay bootstrap-server.sh"

pnpm install --frozen-lockfile
npx prisma generate
npx prisma migrate deploy
pnpm build

if [ ! -f "$SERVER_DIR/dist/main.js" ]; then
  die "Build xong nhung khong co dist/main.js"
fi
ok "build xong"

# ------------------------------------------------------------ 3. khoi dong
step "3. Khoi dong lai PM2 (chi $PM2_NAME)"
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 delete "$PM2_NAME" >/dev/null
  ok "da xoa process cu (de ap dung dung tham so khoi dong)"
fi

pm2 start "$SERVER_DIR/dist/main.js" \
  --name "$PM2_NAME" \
  --cwd "$SERVER_DIR" \
  --time \
  --max-memory-restart 512M

for i in $(seq 1 25); do
  code=$(curl -s -m 5 -o /dev/null -w '%{http_code}' "$HEALTH_URL" || true)
  if [ "$code" = "200" ]; then
    ok "API len sau ${i}s"
    break
  fi
  sleep 1
done

# ------------------------------------------------------------- 4. kiem tra
step "4. Kiem tra"
echo -n "api/health       : "; curl -s -m 10 "$HEALTH_URL"; echo
echo -n "api/admin/events : "; curl -s -m 10 -o /dev/null -w '%{http_code} (401 = route ton tai, 404 = thieu)\n' "${BASE_URL}/api/admin/events"
echo -n "web /            : "; curl -s -m 10 -o /dev/null -w '%{http_code}\n' "${BASE_URL}/"
echo -n "web /admin/      : "; curl -s -m 10 -o /dev/null -w '%{http_code}\n' "${BASE_URL}/admin/"
echo -n "web /bookings    : "; curl -s -m 10 -o /dev/null -w '%{http_code}\n' "${BASE_URL}/bookings"

health="$(curl -s -m 10 "$HEALTH_URL" || true)"
if ! echo "$health" | grep -q '"status":"ok"'; then
  echo "[x] Health check that bai. Response: $health"
  echo "--- 30 dong log cuoi ---"
  pm2 logs "$PM2_NAME" --lines 30 --nostream || true
  exit 1
fi

# ----------------------------------------------------------------- 5. save
step "5. Luu trang thai PM2 (de tu chay lai khi reboot)"
pm2 save
pm2 list | grep -E 'name|tennishub|mocphim' || pm2 list

echo
echo "DEPLOY_OK"
