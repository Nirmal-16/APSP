import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The People page was renamed Research Team (client request, 26/10/2026),
  // then Lab Members (11/11/2026). Old links keep working; #profile hashes
  // are kept by the browser.
  async redirects() {
    return [
      { source: "/people", destination: "/lab-members", permanent: true },
      { source: "/research-team", destination: "/lab-members", permanent: true },
    ];
  },
};

export default nextConfig;
