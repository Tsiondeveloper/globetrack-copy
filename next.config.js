/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fjhnzekvcxafxynwdotg.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nmeputnrmxkthcwbilpq.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kuspzthpwfyzkqvpscwt.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config, { isServer }) => {
    // Server-only packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        util: false,
        crypto: false
      };
    }
    return config;
  },
};

module.exports = nextConfig; 