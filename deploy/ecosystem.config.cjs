/**
 * PM2 process definition for the production server.
 * Started and reloaded by deploy/deploy.sh. Runs the Next.js standalone
 * server on 127.0.0.1:3000; Nginx is the only public entry point.
 */
const fs = require("fs");

/** Reads KEY=value lines from the server's env file (comments and blanks ignored). */
function loadEnv(file) {
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;
    env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

module.exports = {
  apps: [
    {
      name: "futurize",
      cwd: "/var/www/futurize/current",
      script: "server.js",
      env: {
        ...loadEnv("/var/www/futurize/shared/.env.production"),
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "127.0.0.1",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "600M",
      autorestart: true,
      time: true,
    },
  ],
};
