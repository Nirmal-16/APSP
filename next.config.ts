import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The People page was renamed Research Team (client request, 26/10/2026).
  // Old links keep working; #profile hashes are kept by the browser.
  async redirects() {
    return [{ source: "/people", destination: "/research-team", permanent: true }];
  },
};

export default nextConfig;
