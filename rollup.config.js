import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      name: "toastam",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom", "react-transition-group"],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    postcss({
      extensions: [".css"],
    }),
  ],
});
