import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Trailing slash for better static hosting compatibility
  trailingSlash: true,
  // Add environment variable for static export
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: 'true',
  },
};

export default nextConfig;