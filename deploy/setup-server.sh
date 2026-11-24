#!/usr/bin/env bash
# One-time setup of an Ubuntu 22.04/24.04 server for futurizetechnology.com.
# Run as root (or with sudo) on the server:
#   sudo bash setup-server.sh you@example.com
# The email is used by Let's Encrypt for certificate expiry notices.
set -euo pipefail

EMAIL="${1:?Usage: sudo bash setup-server.sh you@example.com}"
REPO="https://github.com/beri12/futuruzetech.git"
BRANCH="${BRANCH:-claude/gifted-keller-mvb44c}"
APP_DIR=/var/www/futurize
DOMAIN=futurizetechnology.com

echo "==> Installing system packages"
apt-get update -y
apt-get install -y curl git nginx ufw ca-certificates gnupg

echo "==> Installing Node.js 22 LTS"
if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
npm install -g pm2

echo "==> Firewall: SSH + web only"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> Getting the code"
mkdir -p "$APP_DIR/shared"
if [ ! -d "$APP_DIR/repo/.git" ]; then
  git clone --branch "$BRANCH" "$REPO" "$APP_DIR/repo"
fi

if [ ! -f "$APP_DIR/shared/.env.production" ]; then
  cp "$APP_DIR/repo/.env.example" "$APP_DIR/shared/.env.production"
  chmod 600 "$APP_DIR/shared/.env.production"
  echo "    Created $APP_DIR/shared/.env.production from the example."
  echo "    Edit it (contact email, Resend keys) and re-run deploy.sh afterwards."
fi

echo "==> Nginx"
cp "$APP_DIR/repo/deploy/nginx/$DOMAIN.conf" "/etc/nginx/sites-available/$DOMAIN.conf"
ln -sf "/etc/nginx/sites-available/$DOMAIN.conf" "/etc/nginx/sites-enabled/$DOMAIN.conf"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> First build and start"
BRANCH="$BRANCH" bash "$APP_DIR/repo/deploy/deploy.sh"

echo "==> PM2 starts the site on boot"
pm2 startup systemd -u root --hp /root >/dev/null
pm2 save

echo "==> HTTPS certificate (Let's Encrypt)"
apt-get install -y certbot python3-certbot-nginx
certbot --nginx --non-interactive --agree-tos -m "$EMAIL" \
  -d "$DOMAIN" -d "www.$DOMAIN" --redirect

echo
echo "Done. Visit https://$DOMAIN"
