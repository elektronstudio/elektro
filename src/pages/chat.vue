<script setup lang="ts">
import { useSessionStorage } from "@vueuse/core";
import { EBox, EButton, EFormTextArea, EFormText } from "../lib";
import { useChat } from "../utils";

const userId = useSessionStorage("elektron_user_id", "1234");
const userName = useSessionStorage("elektron_user_name", "Somebody");

const {
  chatMessages,
  newChatMessage,
  onNewChatMessage,
  scrollRef,
  textareaRef,
} = useChat("test", userId, userName);
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
      <!-- TODO: Make it work with ref -->
      <EFormTextArea v-model="newChatMessage" />
      <EFormText v-model="userId" />
      <EFormText v-model="userName" />
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
