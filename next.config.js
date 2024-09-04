/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // This will only run in production and for the client-side bundle
    if (!dev && !isServer) {
      // Perform customizations to webpack config
      config.optimization.minimize = true;
    }
    return config;
  },
}

module.exports = nextConfig
