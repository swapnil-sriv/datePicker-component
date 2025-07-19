import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: require.resolve("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      react: require("eslint-plugin-react"),
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed for Next.js
    },
  },
  {
    files: ["**/__tests__/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "testing-library": require("eslint-plugin-testing-library"),
      jest: require("eslint-plugin-jest"),
    },
    rules: {
      // Optional: Add RTL and Jest rules
    },
  },
];
