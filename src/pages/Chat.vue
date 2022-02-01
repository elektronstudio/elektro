<script setup lang="ts">
import { EBox, EButton, EFormTextArea } from "../lib";
import { loadMessages, messages } from "../utils/message";
import { useChat } from "../utils/chat";
const {
  chatMessages,
  newChatMessage,
  onNewChatMessage,
  scrollRef,
  textareaRef,
} = useChat("test");
loadMessages();
</script>

<template>
  <div class="Chat">
    <div>
      <textarea
        style="color: black; width: 100%; padding: var(--p-2)"
        v-model="newChatMessage"
        ref="textareaRef"
      />
      <br />
      <EButton size="xs" @click="onNewChatMessage">Submit</EButton>
    </div>
    <div ref="scrollRef" class="messages">
      <EBox v-for="message in chatMessages">
        <pre>{{ message }}</pre>
      </EBox>
    </div>
  </div>
</template>

<style scoped>
.Chat {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-4);
  padding: var(--p-4);
  height: 100vh;
}
.messages {
  height: 80vh;
  display: grid;
  gap: var(--gap-4);
  overflow: auto;
}
</style>
