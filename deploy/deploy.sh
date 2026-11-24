#!/usr/bin/env bash
# Build and (re)start the latest code. Safe to run repeatedly; each run
# builds into a fresh release folder and switches over only after the build
# succeeds, so a failed build never takes the live site down.
#   sudo bash /var/www/futurize/repo/deploy/deploy.sh
set -euo pipefail

APP_DIR=/var/www/futurize
REPO_DIR="$APP_DIR/repo"
BRANCH="${BRANCH:-claude/gifted-keller-mvb44c}"
ENV_FILE="$APP_DIR/shared/.env.production"
RELEASE="$APP_DIR/releases/$(date +%Y%m%d%H%M%S)"

cd "$REPO_DIR"
echo "==> Updating code ($BRANCH)"
git fetch origin "$BRANCH"
git checkout -q "$BRANCH"
git reset -q --hard "origin/$BRANCH"

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
# NEXT_PUBLIC_* values are baked in at build time, so load the env file first.
set -a; [ -f "$ENV_FILE" ] && . "$ENV_FILE"; set +a
# Next.js prints a one-time upgrade notice on some builds; retry once.
npm run build || npm run build

echo "==> Assembling release $RELEASE"
mkdir -p "$RELEASE"
cp -r .next/standalone/. "$RELEASE/"
mkdir -p "$RELEASE/.next"
cp -r .next/static "$RELEASE/.next/static"
cp -r public "$RELEASE/public"

ln -sfn "$RELEASE" "$APP_DIR/current"

echo "==> Restarting"
if pm2 describe futurize >/dev/null 2>&1; then
  pm2 reload "$REPO_DIR/deploy/ecosystem.config.cjs" --update-env
else
  pm2 start "$REPO_DIR/deploy/ecosystem.config.cjs"
fi
pm2 save >/dev/null

echo "==> Keeping the last 3 releases"
ls -1dt "$APP_DIR"/releases/* | tail -n +4 | xargs -r rm -rf

sleep 2
curl -fsS -o /dev/null -w "Health check: HTTP %{http_code}\n" http://127.0.0.1:3000/ || {
  echo "Health check failed; see: pm2 logs futurize"; exit 1; }
