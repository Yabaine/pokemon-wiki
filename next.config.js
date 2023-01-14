const path = require('path');

module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  /* reactStrictMode: true, */
};
