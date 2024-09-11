/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.pixelbin.io"], // Add the required domain here
  },
};

export default nextConfig;
