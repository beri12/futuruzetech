# Deploying to futurizetechnology.com

The site runs on your own server (`196.190.212.130`) as a Node.js process
managed by PM2, behind Nginx, with a free Let's Encrypt HTTPS certificate.

```
visitor ──HTTPS──> Nginx (:80/:443) ──> Next.js standalone server (127.0.0.1:3000, PM2)
www.futurizetechnology.com ──301──> https://futurizetechnology.com
```

## DNS (already in place)

| Type  | Name                         | Value                    |
| ----- | ---------------------------- | ------------------------ |
| A     | `futurizetechnology.com`     | `196.190.212.130`        |
| CNAME | `www.futurizetechnology.com` | `futurizetechnology.com` |

Both must resolve to the server before the HTTPS step, or Let's Encrypt
cannot verify the domain. Check with `nslookup futurizetechnology.com`.

## Requirements

- Ubuntu 22.04 or 24.04 (other Debian-based systems work with small changes)
- Root or sudo access over SSH
- Ports 80 and 443 open to the internet (also in any hosting-provider firewall)
- About 1 GB RAM free for the build (add swap on smaller servers)
- If the GitHub repository is private, the server needs read access
  (a deploy key or a personal access token), see "Private repository" below

## First deployment (once)

```bash
ssh root@196.190.212.130
curl -fsSLO https://raw.githubusercontent.com/beri12/futuruzetech/claude/gifted-keller-mvb44c/deploy/setup-server.sh
sudo bash setup-server.sh you@yourdomain.com
```

The email is only used by Let's Encrypt for certificate notices. The script:

1. installs Nginx, Node.js 22, PM2 and Certbot, and opens ports 22/80/443
2. clones the code to `/var/www/futurize/repo`
3. creates `/var/www/futurize/shared/.env.production` from `.env.example`
4. installs the Nginx site (with the `www` → bare domain redirect)
5. builds and starts the site with PM2 (and enables start on reboot)
6. issues the HTTPS certificate and turns on HTTP → HTTPS redirects

Then fill in your real settings and redeploy so they take effect:

```bash
sudo nano /var/www/futurize/shared/.env.production
sudo bash /var/www/futurize/repo/deploy/deploy.sh
```

At minimum set `NEXT_PUBLIC_SITE_URL=https://futurizetechnology.com` (already
the default) and, for the contact form, `RESEND_API_KEY` (and optionally `CONTACT_EMAIL` and
`EMAIL_FROM`; see README → Contact form setup).

## Updating the site later

After new commits are pushed:

```bash
sudo bash /var/www/futurize/repo/deploy/deploy.sh
```

Each deploy builds into a new folder under `/var/www/futurize/releases/` and
switches over only when the build succeeds, so a failed build leaves the
live site untouched. The last three releases are kept.

To deploy a different branch (for example `main` once this work is merged):

```bash
sudo BRANCH=main bash /var/www/futurize/repo/deploy/deploy.sh
```

## Useful commands

```bash
pm2 status                 # is the site running?
pm2 logs futurize          # application logs
pm2 restart futurize       # restart without rebuilding
sudo nginx -t && sudo systemctl reload nginx
sudo certbot renew --dry-run   # certificates renew automatically
```

Roll back to the previous release:

```bash
ls -1dt /var/www/futurize/releases/*      # newest first
sudo ln -sfn /var/www/futurize/releases/<previous> /var/www/futurize/current
pm2 reload futurize
```

## Private repository

If `git clone` asks for a password, the repository is private. Either:

- **Deploy key (recommended):** on the server run `ssh-keygen -t ed25519 -f ~/.ssh/futurize -N ""`,
  add `~/.ssh/futurize.pub` in GitHub → repository → Settings → Deploy keys
  (read-only), and use `REPO=git@github.com:beri12/futuruzetech.git`; or
- **Token:** clone once with a fine-grained personal access token that has
  read access to this repository only.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Certbot fails | DNS points elsewhere, or port 80 is blocked by a provider firewall |
| 502 Bad Gateway | `pm2 logs futurize`; the app is not running on 127.0.0.1:3000 |
| Contact form says "not configured" | Resend variables missing in `.env.production`, then redeploy |
| Old content after deploy | Hard-refresh the browser; check `readlink /var/www/futurize/current` |
| Build killed / out of memory | Add swap: `fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile` |
