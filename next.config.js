// /** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
          {
            protocol: 'https',
            hostname: 'kmspacking.com',
            port: '5003',
            pathname: '/blog/**',
          },
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '5003',
            pathname: '/category/**',
          },
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '5003',
            pathname: '/machine/**',
          },
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '5003',
            pathname: '/blog/**',
          },
        ],
      },
}

module.exports = nextConfig
