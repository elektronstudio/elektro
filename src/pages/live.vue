<script setup lang="ts">
import { Draggable } from "../utils";
import ELiveView from "../components/ELiveView.vue";

const data = [
  {
    title: "Electron 1",
    draggableId: "draggable-electron-1",
    gridPosX: 1,
    gridPosY: 1,
    tilesWidth: 4,
    tilesHeight: 4,
    isMinimised: false,
    order: 8,
  },
  {
    title: "Electron 2",
    draggableId: "draggable-electron-2",
    gridPosX: 6,
    gridPosY: 1,
    tilesWidth: 6,
    tilesHeight: 2,
    isMinimised: false,
    order: 4,
  },
  {
    title: "Chat",
    draggableId: "elektron-chat",
    contentType: "chat",
    tilesWidth: 4,
    tilesHeight: 6,
  },
] as Draggable[];
</script>

<template>
  <ELiveView :data="data" />
</template>
