import { RemovableRef, useSessionStorage } from "@vueuse/core";
import { randomString } from ".";

export const userId: RemovableRef<string> = useSessionStorage(
  "elektron_user_id",
  randomString(),
);
export const userName: RemovableRef<string> = useSessionStorage(
  "elektron_user_name",
  randomString(),
);
