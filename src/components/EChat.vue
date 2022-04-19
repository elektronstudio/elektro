<script setup lang="ts">
import { EButton } from "../lib";
import { useChat, scrollToBottom } from "../utils";

type Props = {
  userId: string;
  userName: string;
  channel: string;
};

const { userId, userName, channel } = defineProps<Props>();

const {
  chatMessages,
  newChatMessage,
  onNewChatMessage,
  scrollRef,
  textareaRef,
  newMessagesCount,
} = useChat(channel, userId, userName);
</script>

<template>
  <div class="EChat">
    <div class="messagesWrapper">
      <div class="messages" ref="scrollRef">
        <template v-for="message in chatMessages">
          <div v-if="message.value" class="message">
            <p v-if="message.userName" class="username">
              {{ message.userName }}
            </p>
            <p>{{ message.value }}</p>
          </div>
        </template>
      </div>
      <EButton
        class="newMessages"
        v-if="newMessagesCount > 0"
        size="xs"
        color="accent"
        @click="scrollToBottom(scrollRef)"
      >
        {{ newMessagesCount }} new message
      </EButton>
    </div>
    <div class="messageBox">
      <!-- TODO: Make it work with ref -->
      <textarea
        class="chatTextarea"
        v-model="newChatMessage"
        ref="textareaRef"
        resize="none"
      />
      <EButton size="xs" color="accent" @click="onNewChatMessage">
        Saada
      </EButton>
    </div>
  </div>
</template>

<style scoped>
.EChat {
  display: flex;
  flex-direction: column;
  padding: var(--p-2);
  background-color: var(--bg);
  /* @TODO: Is this too much? */
  width: 100%;
  height: 100%;
}

.messagesWrapper {
  flex-grow: 1;
  position: relative;
}
.messages {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;
}

.message {
  padding: var(--p-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.username {
  color: var(--gray-400);
}

/* TODO: add admin message class modifier */
.message:nth-child(4) {
  background-color: var(--accent);
}
.message:nth-child(4) p {
  color: var(--bg);
}
.message:nth-child(4) {
  background-color: var(--accent);
}

.messageBox {
  flex-shrink: 0;
  margin-bottom: 0;
  /* height: 2rem; */
  display: flex;
  align-items: flex-end;
}

.chatTextarea {
  flex-grow: 1;
  margin-right: var(--p-2);
  background-color: var(--bg);
  padding: 0 var(--p-3);
  resize: none;
  height: 1.6rem;
  border: 1px solid var(--gray-300);
  width: 100%;
}

.chatTextarea:focus {
  outline: none;
  border-color: var(--fg);
}
.chatTextarea:not(:disabled):hover {
  background-color: rgba(250, 250, 250, 0.1);
}

.newMessages {
  position: absolute;
  bottom: var(--p-2);
  left: 50%;
  transform: translateX(-50%);
}
</style>
