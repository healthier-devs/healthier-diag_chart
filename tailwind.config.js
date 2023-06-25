const SIDEBAR_WIDTH = "250px";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        app_indigo: "#041029",
        app_healthier_blue: "#5464F2",
        app_healthier_indigo: "rgba(84, 100, 242, 0.3)",
        app_healthier_bg: "#f1f0f0",
        app_blue_50: "#F0F2FF",
        app_blue_100: "#CED2F2",
        app_blue_500: "rgba(109, 123, 242, 1)",
        app_gray_100: "#F8F8F8",
        app_gray_850: "#17191c",
        app_gray_900: "#131416",
      },
      borderColor: {
        app_stroke_blue: "rgba(183, 190, 255, 0.5)",
        app_stroke_gray_300: "#C5C8CE",
        app_stroke_healthier_blue: "#5464F2",
      },
      textColor: {
        font_gray_400: "#999da4",
        font_healthier_blue: "#5464F2",
      },
      width: {
        Sidebar: SIDEBAR_WIDTH,
        Content: `calc(100vw - ${SIDEBAR_WIDTH})`,
      },
    },
  },
  plugins: [],
};
