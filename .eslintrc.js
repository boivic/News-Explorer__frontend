module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-underscore-dangle": "off",
    "no-console": "off"
  },
};
