import mdTailwindConfig from '@mdreader/md/tailwind.config';
import uiTailwindConfig from '@mdreader/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...mdTailwindConfig,
  ...uiTailwindConfig,
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/md/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...uiTailwindConfig.theme,
    extend: {
      ...uiTailwindConfig.theme.extend,
      ...mdTailwindConfig.theme.extend,
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
