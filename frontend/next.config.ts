import type { NextConfig } from "next";
import { API_URL } from "./endpoint.constant";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${API_URL}/api/v1/:path*`, // redirects to backend
      },
    ];
  },
};

export default nextConfig;
