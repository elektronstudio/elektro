<script setup lang="ts">
import { ref } from "vue";
import { useMessage, safeJsonParse, userId, userName } from "../utils";
import type { Message } from "../utils";

const { ws, sendMessage } = useMessage();

type DraggableChatUser = {
  userId: string;
  x: number;
  y: number;
};
const users = ref<DraggableChatUser[]>([]);

const channel = "test";

ws.addEventListener("message", ({ data }) => {
  const message = safeJsonParse(data);
  if (message.channel === channel && message.type === "USER") {
    // Upsert the user to users
    const user = {
      userId: message.userId,
      userName: message.userName,
      x: message.value.x,
      y: message.value.y,
    };
    const existingUserIndex = users.value?.findIndex((u) => {
      return u.userId === user.userId;
    });
    if (users.value && existingUserIndex > -1) {
      users.value[existingUserIndex] = user;
    } else {
      users.value = [...users.value, user];
    }
  }
});

const onDrag = () => {
  const message: Message = {
    type: "USER",
    channel,
    userId: userId.value,
    userName: userName.value,
    value: {
      x: Math.random(),
      y: Math.random(),
    },
  };
  sendMessage(message);
};
</script>

<template>
  <div style="padding: var(--gap-4)">
    <button @click="onDrag">Drag</button>
    <pre>{{ users }}</pre>
  </div>
</template>
