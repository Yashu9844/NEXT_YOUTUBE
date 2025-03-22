import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Allow HTTP
        hostname: "image.mux.com",
      },
      {
        protocol: "https", // Allow HTTPS
        hostname: "image.mux.com",
      },
    ],
  },
};

export default nextConfig;
