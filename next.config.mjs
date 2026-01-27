/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gurusharan.s3.tebi.io',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
