/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        pcolor: '#13CAD6',
        scolor: '#13CAD6',
        acolor: '#13CAD6',
        bgcolor: '#13CAD6',
        hoverColor: "#13CAD6",
        brightColor: "#13CAD6",
        backgroundColor: "#13CAD6",
      },
    },
  },
  plugins: [],
}
