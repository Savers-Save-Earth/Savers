/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
        port: "",
        pathname: "/profileImage/**"
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
        port: "",
        pathname: "/community/**"
      }
    ]
  },
}
module.exports = nextConfig;


// video
const withVideos = require("next-videos");
module.exports = withVideos();
