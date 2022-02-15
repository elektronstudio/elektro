import { reactive } from "vue";

export const config = reactive({
  wsUrl: import.meta.env.VITE_WS_URL || "",
  messagesUrl: import.meta.env.VITE_MESSAGES_URL || "",
  fientaUrl: import.meta.env.VITE_FIENTA_URL || "",
  fientaToken: import.meta.env.VITE_FIENTA_TOKEN || "",
  fientaTicketUrl: import.meta.env.VITE_FIENTA_TICKET_URL || "",
});
