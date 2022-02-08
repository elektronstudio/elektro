import { reactive } from "vue";

export const config = reactive({
  wsUrl: import.meta.env.VITE_WS_URL || "",
  messagesUrl: import.meta.env.VITE_MESSAGES_URL || "",
});
