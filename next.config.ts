import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old names of the Lab Members page; #profile hashes carry over.
  async redirects() {
    return [
      { source: "/people", destination: "/lab-members", permanent: true },
      { source: "/research-team", destination: "/lab-members", permanent: true },
    ];
  },
};

export default nextConfig;
