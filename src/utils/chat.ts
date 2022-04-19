import { computed, ref, watch } from "vue";
import { useMessage } from "./message";
import type { MessageType } from "./message";
import { scrollToBottom, useTextarea } from "./dom";
import { useScroll } from "@vueuse/core";
import { newMessages } from "./store";

export function useChat(
  channel: string,
  userId: string,
  userName: string,
  sentMessageType: MessageType = "CHAT",
  receiveMessageType: MessageType = "CHAT",
) {
  const { messages, sendMessage } = useMessage();

  // @TODO: Could this be done on fetch?
  // We only show one channel per page
  const chatMessages = computed(() => {
    return messages.value.filter(
      (m) => m.type === receiveMessageType && m.channel === channel,
    );
  });

  const newChatMessage = ref("");

  const onNewChatMessage = () => {
    if (newChatMessage.value) {
      sendMessage({
        userId: userId,
        userName: userName,
        type: sentMessageType || "CHAT",
        channel: channel,
        value: newChatMessage.value,
        store: true,
      });
      newChatMessage.value = "";
    }
  };

  const textareaRef = useTextarea(onNewChatMessage);
  const scrollRef = ref<HTMLElement | null>(null);

  const lastMessagesCount = ref<number>(0);
  const newMessagesCount = computed(
    () => chatMessages.value.length - lastMessagesCount.value,
  );
  const { arrivedState } = useScroll(scrollRef);
  const userScrolled = computed(() => !arrivedState.bottom);

  watch(arrivedState, (newValue) => {
    if (newValue.bottom) {
      lastMessagesCount.value = chatMessages.value.length;
    }
  });

  watch([userScrolled, chatMessages], (newValue, oldValue) => {
    if (
      !newValue[0] ||
      newValue[1][newValue[1].length - 1].userId === userId ||
      oldValue[1].length === 0
    ) {
      scrollToBottom(scrollRef.value);
      lastMessagesCount.value = chatMessages.value.length;
    }
  });

  watch(
    newMessagesCount,
    (newValue) => {
      newMessages.value = newValue;
    },
    { immediate: true },
  );

  return {
    chatMessages,
    newChatMessage,
    onNewChatMessage,
    scrollRef,
    textareaRef,
    newMessagesCount,
  };
}
