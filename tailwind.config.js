/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        purple: {
          500: '#A855F7',
          600: '#9333EA',
        },
      },
    },
  },
  plugins: [scrollbarHide],
});
