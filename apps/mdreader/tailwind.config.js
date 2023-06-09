import uiTailwindConfig from '@mdreader/interface/tailwind.config';
import mdTailwindConfig from '@mdreader/markdown/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...mdTailwindConfig,
  ...uiTailwindConfig,
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/interface/**/*.{js,ts,jsx,tsx}',
    '../../packages/markdown/**/*.{js,ts,jsx,tsx}',
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
