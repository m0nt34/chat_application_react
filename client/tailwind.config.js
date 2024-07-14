/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: {
          blue: "#1d90f5", 
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(70deg, rgba(38,42,54,1) 56%, rgba(38,42,54,0.7378190255220418) 92%, rgba(38,42,54,0.74) 100%);",
      }
    },
  },
  plugins: [],
};
