import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Self-contained server bundle in .next/standalone (only the runtime
   * dependencies the app uses). Deployed with deploy/deploy.sh and run by PM2
   * behind Nginx; see DEPLOY.md.
   */
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
