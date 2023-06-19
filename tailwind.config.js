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
        app_bg_gray: "#131416",
        app_indigo: "#041029",
        app_healthier_blue: "#5464F2",
        app_healthier_indigo: "rgba(84, 100, 242, 0.3)",
        app_blue_100: "#CED2F2",
      },
      borderColor: {
        app_stroke_blue: "rgba(183, 190, 255, 0.5)",
      },
      textColor: {
        font_gray: "#545454",
      },
      width: {
        Sidebar: SIDEBAR_WIDTH,
        Content: `calc(100vw - ${SIDEBAR_WIDTH})`,
      },
    },
  },
  plugins: [],
};
