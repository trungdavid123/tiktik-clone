/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  images: {
    domains: ['images.nightcafe.studio', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
