import { useSessionStorage } from "@vueuse/core";
import { randomString } from ".";

export const userId = useSessionStorage("elektron_user_id", randomString());
export const userName = useSessionStorage("elektron_user_name", randomString());
