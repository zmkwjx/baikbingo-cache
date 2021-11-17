module.exports = {
  env: {
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
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
    "vue/name-property-casing": 0,
    "vue/component-definition-name-casing": 0
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
};
