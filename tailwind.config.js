module.exports = {
  darkMode: 'class',
  content: ["./src/views/**/*.pug"],
  theme: {
    extend: {
      boxShadow: {
        'popup': '0 25px 50px -12px rgb(0 0 0 / 0.25), 0 -10px 50px -12px rgb(0 0 0 / 0.25)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
