/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  browserNodeBuiltinsPolyfill: {
    modules: { process: true, path: true, url: true },
  },
  future: {
    v2_meta: true,
  },
  ignoredRouteFiles: ['**/.*', '**/*.test.{js,jsx,ts,tsx}'],
  postcss: true,
  serverModuleFormat: 'cjs',
  tailwind: true,
};
