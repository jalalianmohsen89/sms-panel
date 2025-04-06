import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import filenameRulesPlugin from "eslint-plugin-filename-rules";
import checkFilePlugin from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
      "filename-rules": filenameRulesPlugin,
      "check-file": checkFilePlugin,
      import: importPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/prefer-default-export": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: false,
          ignore: ["index", "main", "OTP"], // استثنائات برای JSX کامپوننت‌های index و main
        },
      ],
      "react/jsx-closing-tag-location": [1, { location: "tag-aligned" }],
      // "react/jsx-curly-spacing": [2, "never", { allowMultiline: false }],
      "react/jsx-boolean-value": [2, "never", { always: ["personal"] }],
      "react/jsx-wrap-multilines": [
        2,
        {
          declaration: "parens-new-line",
          assignment: "parens-new-line",
          return: "parens-new-line",
          arrow: "parens-new-line",
          condition: "ignore",
          logical: "ignore",
          prop: "ignore",
        },
      ],

      "react/self-closing-comp": ["error", { component: true, html: true }],
      "react-hooks/rules-of-hooks": "error", // بررسی قوانین Hooks
      "react-hooks/exhaustive-deps": "warn", // هشدار درباره وابستگی‌ها
      "no-empty-function": ["error", { allow: [] }], // اضافه کردن این خط
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["PascalCase", "UPPER_CASE", "camelCase"],
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "enumMember",
          format: ["PascalCase", "UPPER_CASE"],
        },
        {
          selector: "parameterProperty",
          format: ["camelCase"],
        },
        {
          selector: "method",
          format: ["camelCase"],
        },
        {
          selector: "function",
          format: ["PascalCase", "camelCase"],
        },
        {
          selector: "interface",
          format: ["PascalCase"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{jsx,tsx}": "PASCAL_CASE",
          "**/*.{js,ts}": "KEBAB_CASE",
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "src/**/": "KEBAB_CASE" },
      ],
      "no-underscore-dangle": "error",
      indent: ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "no-console": "error",
      "prefer-const": "error",
      "arrow-body-style": ["error", "as-needed"],
      "array-bracket-spacing": ["error", "never"],
      // "prettier/prettier": [
      //   "error",
      //   {
      //     printWidth: 100,
      //     tabWidth: 2,
      //     semi: true,
      //     singleQuote: false,
      //     trailingComma: "none",
      //     bracketSpacing: true,
      //     jsxSingleQuote: false,
      //     arrowParens: "always",
      //   },
      // ],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "comma-dangle": ["error", "never"],
      "arrow-parens": ["error", "always"],
      "max-len": ["error", { code: 100 }],
      "object-curly-spacing": ["error", "always"],
      "jsx-quotes": ["error", "prefer-double"],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "never",
        },
      ],
    },
  },
  {
    files: ["**/index.{js,ts,jsx,tsx}"],
    rules: {
      "check-file/filename-naming-convention": 0,
    },
  },
  {
    files: ["**/*.d.{js,ts,jsx,tsx}"],
    rules: {
      "check-file/filename-naming-convention": 0,
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    rules: {
      "check-file/filename-naming-convention": 0,
    },
  },
  {
    files: ["**/main.{js,ts,jsx,tsx}"],
    rules: {
      "check-file/filename-naming-convention": 0,
    },
  },
  {
    files: ["**/vite-env.d.{js,ts}"],
    rules: {
      "check-file/filename-naming-convention": 0,
    },
  },
  {
    files: ["vite.config.ts"],
    rules: {
      "check-file/filename-naming-convention": 0,
    },
  },
);
