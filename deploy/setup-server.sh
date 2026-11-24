#!/usr/bin/env bash
# One-time setup of an Ubuntu 22.04/24.04 server for futurizetechnology.com.
# Run as root (or with sudo) on the server:
#   sudo bash setup-server.sh you@example.com
# The email is used by Let's Encrypt for certificate expiry notices.
set -euo pipefail

EMAIL="${1:?Usage: sudo bash setup-server.sh you@example.com}"
REPO="${REPO:-https://github.com/beri12/futuruzetech.git}"
BRANCH="${BRANCH:-claude/gifted-keller-mvb44c}"
APP_DIR=/var/www/futurize
DOMAIN=futurizetechnology.com

if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root: sudo bash setup-server.sh $EMAIL"; exit 1
fi
if ! command -v apt-get >/dev/null; then
  echo "This script supports Ubuntu/Debian (apt-get). Your system:"; cat /etc/os-release 2>/dev/null | head -2
  echo "Send this output to your developer to get a version for your system."; exit 1
fi

echo "==> Installing system packages"
apt-get update -y
apt-get install -y curl git nginx ufw ca-certificates gnupg

# The build needs about 1.5 GB of memory; add swap on small servers.
TOTAL_MB=$(awk '/MemTotal/ {print int($2/1024)}' /proc/meminfo)
SWAP_MB=$(awk '/SwapTotal/ {print int($2/1024)}' /proc/meminfo)
if [ $((TOTAL_MB + SWAP_MB)) -lt 2048 ] && [ ! -f /swapfile ]; then
  echo "==> Low memory (${TOTAL_MB} MB): adding a 2 GB swap file"
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

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
  if ! GIT_TERMINAL_PROMPT=0 git clone --branch "$BRANCH" "$REPO" "$APP_DIR/repo"; then
    echo
    echo "Could not download the code. The GitHub repository is probably private."
    echo "Either make it public, or give this server read access (see DEPLOY.md,"
    echo "'Private repository'), then run this script again with REPO=<clone url>."
    exit 1
  fi
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
apt-get install -y certbot python3-certbot-nginx dnsutils
SERVER_IP=$(curl -fsS -4 https://api.ipify.org || true)
DNS_IP=$(dig +short "$DOMAIN" A | tail -1)
if [ -n "$SERVER_IP" ] && [ "$DNS_IP" != "$SERVER_IP" ]; then
  echo "    $DOMAIN points to '$DNS_IP' but this server's public IP is '$SERVER_IP'."
  echo "    The site is running over HTTP; fix the A record, wait for it to update,"
  echo "    then run:  sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --redirect -m $EMAIL --agree-tos"
  exit 0
fi
if ! certbot --nginx --non-interactive --agree-tos -m "$EMAIL" \
  -d "$DOMAIN" -d "www.$DOMAIN" --redirect; then
  echo "    Certificate request failed. Usually port 80 is blocked by your hosting"
  echo "    provider's firewall. Open ports 80 and 443 there, then run:"
  echo "    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --redirect -m $EMAIL --agree-tos"
  exit 1
fi

echo
echo "Done. Visit https://$DOMAIN"
