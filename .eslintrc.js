module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "off",
    strict: 0,
    quotes: [1, "double"],
    camelcase: 0,
    "comma-spacing": [2, { before: false, after: true }],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "max-len": [2, { code: 300 }]
  }
};
