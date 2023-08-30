import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");
//@ts-ignore import
const MyRotation = plugin(function ({ addUtilities}) {
  addUtilities({
    ".my-rotate-y-180" : {
      transform: "rotateY(180deg)",
      animation: "flip 1.5s ease-in-out forwards",
    },
    ".my-rotate-y-180-withoutkey" : {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d"
    },
    ".perspective": {
      perspective:"1000px"
    },
    ".backface-hidden": {
      backfaceVisibility : "hidden"
    },
    "@keyframes flip": {
      "0%": {
        transform: "rotateY(0)",
      },
      "100%": {
        transform: "rotateY(-180deg)",
      },
    },
  })
})

const config: Config = {
  content: [
    // Tailwind CSS가 적용될 수 있게끔 적용함.
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      sidebarButtons: {
        base: 'text-gray-400 non-italic font-normal leading-6',
        hover: 'hover:text-[#10C800]',
        focus: 'focus:text-[#10C800]',
      }
    },
  },
  plugins: [MyRotation],
};
export default config;
