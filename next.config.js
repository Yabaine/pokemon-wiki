const path = require('path');

module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  env: {
    NEXT_PUBLIC_DEFAULT_THEME: 'theme-light',
  },
  /* reactStrictMode: true, */
};
