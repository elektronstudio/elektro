import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import App from "./App.vue";

import "./styles/vars.css";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/styles.css";
import { config } from "./lib";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);

app.mount("#app");
