/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    mdxRs: true,
  },
  // Optimize for production deployment
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  // Enable static exports for better performance
  trailingSlash: false,
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = withMDX(nextConfig) 