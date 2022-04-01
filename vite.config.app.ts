import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import ViteIcons from "unplugin-icons/vite";
import Pages from "vite-plugin-pages";

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    ViteIcons({ autoInstall: true }),
    Pages(),
  ],
});
