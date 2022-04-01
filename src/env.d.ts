/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue" />

declare module "virtual:generated-pages" {
  import type { RouteRecordRaw } from "vue-router";
  const routes: RouteRecordRaw[];
  //@ts-ignore
  export default routes;
}

interface ImportMetaEnv {
  readonly VITE_WS_URL: string;
  readonly VITE_MESSAGES_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
