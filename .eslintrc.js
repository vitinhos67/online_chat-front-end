module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:eslint-plugin/recommended",
    "prettier",
    "plugin:node-dependencies/recommended",
    "plugin:jsonc/recommended-with-jsonc",
    "plugin:unicorn/recommended",
  ],
  plugins: ["eslint-plugin", "prettier", "vue"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
  },
};
