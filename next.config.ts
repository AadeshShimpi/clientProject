import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Trailing slash for better static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;