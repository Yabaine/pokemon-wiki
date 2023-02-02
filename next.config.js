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
  /* reactStrictMode: true, */
};
