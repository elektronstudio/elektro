import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    ViteWebfontDownload([
      "https://fonts.googleapis.com/css2?family=Azeret+Mono&family=Cousine&display=swap",
    ]),
    Pages(),
  ],
});
