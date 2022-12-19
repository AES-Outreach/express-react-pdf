const path = require("path");

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["react", "no-only-tests", "unused-imports", "prefer-arrow"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        sourceType: "module",
        project: ["./tsconfig.test.json"],
        tsconfigRootDir: __dirname,
      },
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-comments/recommended",
        "prettier", // Make sure this is always last
      ],
      rules: {
        "no-only-tests/no-only-tests": "error",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "eslint-comments/no-unused-disable": "error",
        "eslint-comments/no-unlimited-disable": "error",
        "eslint-comments/disable-enable-pair": [
          "error",
          { allowWholeFile: true },
        ],
        "unused-imports/no-unused-imports": "error",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-member-accessibility": [
          "off",
          {
            accessibility: "explicit",
          },
        ],
        "@typescript-eslint/no-require-imports": "error",
        "id-blacklist": "off",
        "id-match": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
          },
        ],
        "no-restricted-properties": [
          2,
          {
            object: "translate",
            property: "getBrowserLang",
            message: "Please use userCurrentLang instead.",
          },
          {
            object: "t",
            property: "getBrowserLang",
            message: "Please use userCurrentLang instead.",
          },
          {
            object: "translateService",
            property: "getBrowserLang",
            message: "Please use userCurrentLang instead.",
          },
        ],
        "no-underscore-dangle": "off",
        "@typescript-eslint/member-ordering": "off",
        "jsdoc/newline-after-description": "off",
        "@typescript-eslint/ban-types": "error",
        "no-var": "error",
        "no-shadow": "off",
        "prefer-arrow/prefer-arrow-functions": "error",
        "prefer-const": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "use-isnan": "error",
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/naming-convention": [
          "error",
          // typeLike (class, interface, typeAlias, enum, typeParameter) should use StrictPascalCase
          { selector: ["typeLike"], format: ["PascalCase"] },
          // Destructured variables should have no casing enforced
          {
            selector: ["variable"],
            modifiers: ["destructured"],
            format: null,
          },
          // Stand-alone variables should be camelCase or UPPER_CASE
          {
            selector: ["variable"],
            format: ["camelCase", "UPPER_CASE"],
          },
          // Class properties and function parameters are only loosely enforced
          {
            selector: ["parameter", "accessor", "typeProperty"],
            format: ["PascalCase", "snake_case", "camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
          },
          // Functions must use camelCase
          {
            selector: [
              "function",
              "variable",
              "classMethod",
              "typeMethod",
              "classProperty",
              "typeProperty",
            ],
            // PascalCase is needed here for React components
            format: ["camelCase", "PascalCase"],
            types: ["function"], // To scope 'parameter', 'classProperty', 'typeProperty' and 'variable'
            filter: { regex: "toJSON", match: false },
          },
        ],
        "@typescript-eslint/consistent-indexed-object-style": [
          "error",
          "record",
        ],
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
