import { ref } from "vue";

type ChatStore = {
  channel: string | null;
  newMessagesCount: number;
};

export const chatStore = ref<ChatStore>({
  channel: null,
  newMessagesCount: 0,
});
