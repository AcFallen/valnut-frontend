import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Enable experimental features for better Docker compatibility

};

export default nextConfig;
