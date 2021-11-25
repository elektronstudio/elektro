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
});
