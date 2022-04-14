<script setup lang="ts">
import { useDraggableChat, userId, userName } from "../utils";

const { center, userRef, userStyle, otherUsers, otherUserStyle, _users } =
  useDraggableChat("draggablechat", userId, userName);
</script>

<template>
  <div style="padding: var(--gap-4)">
    <pre style="opacity: 0.3; pointer-events: none; user-select: none">
      {{ _users }}
    </pre>
  </div>
  <div
    :style="{ top: center.y + 'px', left: center.x + 'px' }"
    style="
      pointer-events: none;
      user-select: none;
      position: fixed;
      width: 25px;
      height: 25px;
      background: rgba(0, 0, 255);
      border-radius: 10000px;
    "
  />
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
      background: rgba(255, 0, 0, 0.7);
      border-radius: 10000px;
    "
  />
</template>
