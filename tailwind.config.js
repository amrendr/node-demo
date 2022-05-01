module.exports = {
  darkMode: 'class',
  content: ["./src/views/**/*.pug"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
