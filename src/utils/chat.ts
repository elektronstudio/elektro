import { computed, ref } from "vue";
import { createMessage, ws } from "./message";
import type { Message, MessageType } from "./message";
import { useScrollToBottom, useTextarea } from "./dom";

const messages = ref<Message[]>([]);

export const useChat = (
  channel: string,
  sentMessageType: MessageType = "CHAT",
  receiveMessageType: MessageType = "CHAT",
) => {
  const chats = computed(() =>
    messages.value.filter(
      (m) => m.type === receiveMessageType && m.channel === channel,
    ),
  );

  const newMessage = ref("");

  const onNewMessage = () => {
    if (newMessage.value) {
      const outgoingMessage = createMessage({
        type: sentMessageType || "CHAT",
        channel: channel,
        value: newMessage,
        store: true,
      });
      ws.send(outgoingMessage);
      newMessage.value = "";
    }
  };

  const textareaRef = useTextarea(onNewMessage);
  const scrollRef = useScrollToBottom();

  return {
    chats,
    newMessage,
    onNewMessage,
    scrollRef,
    textareaRef,
  };
};
