import type { NextConfig } from "next";
import { API_URL } from "./endpoint.constant";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    if (process.env.NODE_ENV === 'development' ) {
      return [
        {
          source: '/api/v1/:path*',
          destination: `${API_URL}/api/v1/:path*`, // redirects to backend
        },
      ];
    }
    return []; // no rewrites in production or other environments
  },
};

export default nextConfig;
