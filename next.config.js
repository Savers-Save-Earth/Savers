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
          hostname: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL,
          port: "",
          pathname: "/storage/v1/object/public/missionIcon/**",
        },
        {
          protocol: "https",
          hostname: "img.freepik.com",
          port: "",
          pathname: "/premium-photo/**",
        },
        {
          protocol: "https",
          hostname: "shopping-phinf.pstatic.net",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "m.nuldam.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "egojin.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "cdn.imweb.me",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "nuldam.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "mastina.co.kr",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "pulstory.pulmuone.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "convenii.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "image.oliveyoung.co.kr",
          port: "",
          pathname: "/**",
        },
      ],
      formats: ["image/webp"]["image/png"],
    },
    disableStaticImages: false,
  }),
);
