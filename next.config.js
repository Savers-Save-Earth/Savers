/** @type {import("next").NextConfig} */

const withImages = require("next-images");
const withVideos = require("next-videos");

module.exports = withImages(
  withVideos({
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "etsquekrypszfrqglupe.supabase.co",
          port: "",
          pathname: "/storage/v1/object/public/profileImage/**",
        },
        {
          protocol: "https",
          hostname: "etsquekrypszfrqglupe.supabase.co",
          port: "",
          pathname: "/storage/v1/object/public/community/**",
        },
        {
          protocol: "https",
          hostname: "etsquekrypszfrqglupe.supabase.co",
          port: "",
          pathname: "/storage/v1/object/public/badge/**",
        },
        {
          protocol: "https",
          hostname: "img.freepik.com",
          port: "",
          pathname: "/premium-photo/**",
        },
      ],
      domains: ["m.nuldam.com"],
    },
  }),
);
