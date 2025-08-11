// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/ku', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
      { source: '/ku/:path*', destination: '/:path*', permanent: true }
    ];
  }
};
export default nextConfig;
