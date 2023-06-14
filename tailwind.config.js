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
        healthier_blue: "#5464F2",
      },
      textColor: {
        font_gray: "#545454",
      },
    },
  },
  plugins: [],
};
