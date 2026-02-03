/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '10mb',
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Silence Turbopack config warning; we explicitly opt in/out via CLI flags.
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        util: false,
        crypto: false,
      }
    }
    return config
  },
}

export default nextConfig