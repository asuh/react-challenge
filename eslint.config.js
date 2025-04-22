import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-config-prettier";
import typescriptParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    ignores: ["vite.config.js", "dist/**", "dist/", "vite.config.*", "vitest.config.*"]
  },
  {
    files: ["*.config.js", ".eslintrc.{js,cjs}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      prettier: prettier
    },
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      "prettier/prettier": "error"
    },
    languageOptions: {
      globals: {
        NEXT_PUBLIC_BACKEND_URL: true,
        REACT_APP_BACKEND_URL: true,
        COPYRIGHT_YEAR: true,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["*.config.js", ".eslintrc.{js,cjs}"],
    plugins: {
      prettier: prettier
    },
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      "prettier/prettier": "error"
    },
    languageOptions: {
      globals: {
        NEXT_PUBLIC_BACKEND_URL: true,
        REACT_APP_BACKEND_URL: true,
        COPYRIGHT_YEAR: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  }
]);
