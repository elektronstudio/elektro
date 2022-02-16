import ky from "ky-universal";

import { config } from "./config";

export const strapi = ky.create({
  prefixUrl: config.strapiUrl as string,
});
