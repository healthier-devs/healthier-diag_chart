const SIDEBAR_WIDTH = "180px";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app_blue_50: "#F0F2FF",
        app_blue_100: "#d4d9ff",
        app_blue_300: '#9da7f2',
        app_blue_500: "rgba(109, 123, 242, 1)",
        app_gray_100: "#F8F8F8",
        app_gray_200: "#e8e8e8",
        app_gray_300: "#c5c8ce",
        app_gray_400: "#999da4",
        app_gray_500: "#787c73",
        app_gray_600: "#3f444f",
        app_gray_700: "#2e323a",
        app_gray_750: "#23272e",
        app_gray_850: "#17191c",
        app_gray_900: "#131416",
        app_gray_200_body_1: '#e8e8e8',
        app_gray_400_body_2 : "#999DA4",
        app_healthier_blue: "#5464F2",
        app_healthier_indigo: "rgba(84, 100, 242, 0.3)",
        app_healthier_sidebar : "rgba(232, 232, 232, 0.50)",
        app_indigo: "#041029",
      },
      backgroundColor: {
        app_gray_bg: "#F8F8F8",
        app_healthier_bg: "#f1f0f0"
      },
      borderColor: {
        app_stroke_blue: "rgba(183, 190, 255, 0.5)",
        app_stroke_gray_200: "#E8E8E8",
        app_stroke_gray_300: "#C5C8CE",
        app_stroke_healthier_blue: "#5464F2",
      },
      textColor: {
        font_gray_400: "#999da4",
        font_gray_600: "#3F444F",
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
