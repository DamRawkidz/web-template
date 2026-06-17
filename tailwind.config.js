module.exports = {
  content: ["./src/**/*.{html,ts}"],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          // accent: "CCEA67",
          // success: "CCEA67",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        "button-primary-color": "#CCEA67",
        "button-second-color": "#D1E3D4",
        "badge-color": "#439829",
        "font-black-color": "#23262F",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("daisyui"),
  ],
};
