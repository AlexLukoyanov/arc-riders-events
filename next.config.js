/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/arc-riders-events' : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    domains: ['metaforge.app'],
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

