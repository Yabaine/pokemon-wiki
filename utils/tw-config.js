// @preval

const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('../tailwind.config');

const fullTwConfig = resolveConfig(tailwindConfig);

module.exports = fullTwConfig;
