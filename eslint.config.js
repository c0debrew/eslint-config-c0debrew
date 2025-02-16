import eslintPlugin from "eslint-plugin-eslint-plugin";
import { node } from "./lib/index.js";

export default [
  ...node,
  eslintPlugin.configs["flat/recommended"],
  {
    rules: { "import/extensions": "off" },
  },
];
