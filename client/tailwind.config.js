/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Removed TypeScript-specific extensions
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Added Inter font
      },
      fontSize: {
        'custom': '19.27px', // Custom font size
      },
      colors: {
        'custom-orange': '#FF8C00', // Custom orange color
        'custom-bg': '#fffcfa',     // Custom background color
      },
      width: {
        'custom-navbar': '769px',   // Custom width for navbar
      },
      height: {
        'custom-navbar': '71.16px', // Custom height for navbar
      },
      padding: {
        'custom-x': '32.11px',      // Custom horizontal padding
        'custom-y': '24.08px',      // Custom vertical padding
      },
    },
  },
  plugins: [],
};
