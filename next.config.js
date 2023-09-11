/** @type {import('next').NextConfig} */

const withImages = require('next-images');
const withVideos = require('next-videos');

module.exports = withImages(
  withVideos({
    reactStrictMode: true,
    images: {
      remotePatterns: [
        // {
        //   protocol: 'https',
        //   hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
        //   port: '',
        //   pathname: '/profileImage/**',
        // },
        // {
        //   protocol: 'https',
        //   hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
        //   port: '',
        //   pathname: '/community/**',
        // },
        // {
        //   protocol: 'https',
        //   hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
        //   port: '',
        //   pathname: '/badge/**',
        // },
        {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/premium-photo/**'
      },
      {
        protocol: 'https',
        hostname: 'etsquekrypszfrqglupe.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/community/**'
      },
      {
        protocol: 'https',
        hostname: 'etsquekrypszfrqglupe.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/badge/**'
      }
      ],
    },
  })
);

// issue handling ref : https://stackoverflow.com/questions/60341151/next-images-and-next-videos-are-not-working-properly

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
//         port: "",
//         pathname: "/profileImage/**"
//       },
//       {
//         protocol: "https",
//         hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
//         port: "",
//         pathname: "/community/**"
//       },
//       {
//         protocol: "https",
//         hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
//         port: "",
//         pathname: "/badge/**"
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.freepik.com',
//         port: '',
//         pathname: '/premium-photo/**'
//       }
//     ]
//   },
// }
// // module.exports = nextConfig;


// // video
// const withVideos = require("next-videos");
// const withImages = require("next-images");
// module.exports = withImages(withVideos())
