// /** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'kmspacking.com',
            port: '5003',
            pathname: '/category/**',
          },
          {
            protocol: 'https',
            hostname: 'kmspacking.com',
            port: '5003',
            pathname: '/machine/**',
          },
        ],
      },
}

module.exports = nextConfig
