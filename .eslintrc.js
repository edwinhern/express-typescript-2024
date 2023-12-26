module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["build", ".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ["simple-import-sort", "@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
