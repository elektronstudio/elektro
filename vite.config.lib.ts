import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      script: {
        refTransform: true,
        propsDestructureTransform: true,
      },
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
