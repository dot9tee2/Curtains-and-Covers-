/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],  // ✅ Removed 'mdx'
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize for production deployment
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig  // ✅ Direct export, no withMDX wrapper