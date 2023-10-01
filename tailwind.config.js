/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        fontGeneralSansBold: ['GeneralSans-Bold'],
        fontGeneralSansRegular: ['GeneralSans-Regular'],
        fontGeneralSansSemibold: ['GeneralSans-Semibold'],
      },
    },
  },
  plugins: [],
};
