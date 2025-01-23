import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import jsxa11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";

import babelParser from "@babel/eslint-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules", "dist"],
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,
  jsxa11y.flatConfigs.recommended,
  ...compat.extends("airbnb-base"),
  ...compat.extends("plugin:import/recommended"),
  ...compat.extends("plugin:prettier/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),

  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": "off",
      "no-underscore-dangle": "off",
      "consistent-return": "off",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
