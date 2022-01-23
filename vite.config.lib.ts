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
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "virtual:generated-pages"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
