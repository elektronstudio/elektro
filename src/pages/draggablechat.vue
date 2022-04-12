<script setup lang="ts">
import { computed, ref } from "vue";
import { debouncedWatch, useDraggable } from "@vueuse/core";
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

const el = ref<HTMLElement | null>(null);

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 100, y: 100 },
});

const USER_UPDATE_RATE = 50; // ms

const otherUsers = computed(() =>
  users.value.filter((u) => u.userId !== userId.value),
);

debouncedWatch(
  [x, y],
  () => {
    const message: Message = {
      type: "USER",
      channel,
      userId: userId.value,
      userName: userName.value,
      value: {
        x: x.value,
        y: y.value,
      },
    };
    sendMessage(message);
  },
  {
    immediate: true,
    debounce: USER_UPDATE_RATE,
  },
);

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
    <pre style="pointer-events: none">{{ users }}</pre>
  </div>
  <div
    v-for="user in otherUsers"
    :style="{ top: user.y + 'px', left: user.x + 'px' }"
    style="
      position: fixed;
      width: 25px;
      height: 25px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10000px;
    "
  />
  <div
    ref="el"
    :style="style"
    style="
      position: fixed;
      width: 25px;
      height: 25px;
      background: red;
      border-radius: 10000px;
    "
  />
</template>
