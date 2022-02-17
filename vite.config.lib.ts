import { defineConfig } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    ViteWebfontDownload([
      "https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Cousine&display=swap",
    ]),
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
