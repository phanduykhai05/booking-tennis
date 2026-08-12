import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.tkbcdn.com",
        protocol: "https",
      },
      {
        hostname: "salt.tkbcdn.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
