import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    Vue({
      script: {
        refTransform: true,
        propsDestructureTransform: true,
      },
    }),
    Pages(),
  ],
});
