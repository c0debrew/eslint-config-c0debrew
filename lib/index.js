import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import github from "eslint-plugin-github";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import n from "eslint-plugin-n";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import promise from "eslint-plugin-promise";
import reactHooks from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";

const base = tseslint.config(
  comments.recommended,
  n.configs["flat/recommended"],
  promise.configs["flat/recommended"],
  security.configs.recommended,
  jsdoc.configs["flat/recommended-typescript-error"],
  github.getFlatConfigs().recommended,
  github.getFlatConfigs().typescript,
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/sort-type-constituents": "error",
      "n/no-missing-import": "off",
      "n/no-unpublished-import": "off",
      "sort-imports": "error",
      "sort-keys": "error",
      "sort-vars": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    extends: [tseslint.configs.disableTypeChecked],
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
  },
);

export const node = [
  ...base,
  {
    rules: {
      "i18n-text/no-en": "off",
      "no-console": "off",
    },
  },
  prettierRecommended,
];

export const react = [
  ...base,
  {
    rules: {},
  },
  {
    ...reactPlugin.configs.flat.recommended,
    ...github.getFlatConfigs().browser,
    ...github.getFlatConfigs().react,
    ...reactHooks.configs["recommended-latest"],
    files: ["**/*.{jsx,mjsx,tsx,mtsx}"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  prettierRecommended,
];
