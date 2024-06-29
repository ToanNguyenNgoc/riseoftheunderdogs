/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/thanh-toan-thanh-cong/:id',
        destination: '/paymentgateways/:id'
      }
    ]
  },
  experimental: { esmExternals: true }
}

export default nextConfig
