module.exports = {
  env: {
    browser: true,
    node: true,
    jasmine: true,
    es6: true
  },
  parser: "babel-eslint",
  plugins: [
    "import"
  ],
  extends: ["eslint:recommended", "plugin:import/recommended", "plugin:import/errors", "plugin:import/warnings"],
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
    "max-len": [2, { code: 300 }],
    "import/no-unresolved": [2, {commonjs: true, amd: true}],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2
  }
};
