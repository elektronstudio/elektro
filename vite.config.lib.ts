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
      name: "elektronstudio",
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
