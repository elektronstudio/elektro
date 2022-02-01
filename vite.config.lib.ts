import { defineConfig } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.ts"),
      name: "elektro",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        const formats = {
          es: "elektro.mjs",
          cjs: "elektro.cjs",
          umd: "elektro.js",
        };
        return formats[format];
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
