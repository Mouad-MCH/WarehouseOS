/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
    cacheComponents: true,
  },
};

export default nextConfig;
