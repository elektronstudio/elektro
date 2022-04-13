<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { debouncedWatch, useDraggable } from "@vueuse/core";
import { useMessage, safeJsonParse, userId, userName } from "../utils";
import type { Message } from "../utils";

const { ws, sendMessage } = useMessage();

type DraggableChatUser = {
  userId: string;
  x: number;
  y: number;
};

const CHANNEL = "draggablechat";
const UPDATE_RATE = 600;
const ANIMATION_RATE = 300;
// https://cubic-bezier.com/#.48,.76,.78,.95
const ANIMATION_EASING = "cubic-bezier(.48,.76,.78,.95)";

function useDraggableChat(userId: Ref<string>, userName: Ref<string>) {
  const users = ref<DraggableChatUser[]>([]);

  ws.addEventListener("message", ({ data }) => {
    const message = safeJsonParse(data);
    if (message.channel === CHANNEL && message.type === "USER") {
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

  const userRef = ref<HTMLElement | null>(null);

  const {
    x,
    y,
    style: userStyle,
  } = useDraggable(userRef, {
    // TODO: Initialize with random values
    initialValue: { x: 100, y: 100 },
  });

  const otherUsers = computed(() =>
    users.value.filter((u) => u.userId !== userId.value),
  );

  debouncedWatch(
    [x, y],
    () => {
      const message: Message = {
        type: "USER",
        channel: CHANNEL,
        userId: userId.value,
        userName: userName.value,
        value: {
          x: x.value,
          y: y.value,
        },
      };
      sendMessage(message);
      // TODO: Store user locaction locally?
    },
    {
      immediate: true,
      debounce: UPDATE_RATE,
    },
  );

  const otherUserStyle = (user: DraggableChatUser) => {
    return {
      top: `${user.y}px`,
      left: `${user.x}px`,
      transition: `all ${ANIMATION_RATE}ms ${ANIMATION_EASING}`,
    };
  };
  // Remove _users when done debugging
  return { userRef, userStyle, otherUsers, otherUserStyle, _users: users };
}

const { userRef, userStyle, otherUsers, otherUserStyle, _users } =
  useDraggableChat(userId, userName);
</script>

<template>
  <div style="padding: var(--gap-4)">
    <pre style="opacity: 0.3; pointer-events: none; user-select: none">
      {{ _users }}
    </pre>
  </div>
  <div
    v-for="user in otherUsers"
    :style="otherUserStyle(user)"
    style="
      position: fixed;
      width: 25px;
      height: 25px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10000px;
    "
  />
  <div
    ref="userRef"
    :style="userStyle"
    style="
      position: fixed;
      width: 25px;
      height: 25px;
      background: red;
      border-radius: 10000px;
    "
  />
</template>
