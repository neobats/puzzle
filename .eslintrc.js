module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-native",
    "prettier",
    "react-hooks",
    "@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off", // TS can infer this
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
