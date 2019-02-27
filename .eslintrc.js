module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "jest"
  ],
  "env": {
      "browser": true,
      "jest/globals": true,
  },
  "rules": {
    "camelcase": "warn",
  },
};
