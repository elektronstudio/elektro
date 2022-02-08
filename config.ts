export const config = {
  wsUrl: import.meta.env.VITE_WS_URL || (window as any)?.VITE_WS_URL || "",
  messagesUrl:
    import.meta.env.VITE_MESSAGES_URL ||
    (window as any)?.VITE_MESSAGES_URL ||
    "",
};
