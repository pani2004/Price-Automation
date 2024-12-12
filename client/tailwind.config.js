/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Adjusted to match JavaScript and JSX files only
  ],
  theme: {
    extend: {
      fontFamily: {
        'sf-display': ['"SF Pro Display"', 'sans-serif'], // SF Pro Display font
      },
    },
  },
  plugins: [],
};

