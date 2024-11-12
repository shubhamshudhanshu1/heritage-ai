/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "randomuser.me",
      "cdn.shopify.com",
      "images.squarespace-cdn.com",
      "dn.shopify.com",
      "mms-images.out.customink.com",
      "cdn.logojoy.com",
      "encrypted-tbn0.gstatic.com",
    ], // Add the required domain here
  },
};

export default nextConfig;
