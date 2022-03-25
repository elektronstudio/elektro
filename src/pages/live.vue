<script setup lang="ts">
import { Draggable, useLive } from "../utils";
import ELiveView from "../components/ELiveView.vue";
import { ref } from "vue";

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

const draggablesState = ref<Draggable[]>(data);
const minimisedDraggables = ref<Draggable[]>([]);

const { updateDraggablesDesktop, updateDraggablesMobile } = useLive({
  data,
  draggablesState,
  minimisedDraggables,
});
</script>

<template>
  <ELiveView
    :data="data"
    :update-draggables-desktop="updateDraggablesDesktop"
    :update-draggables-mobile="updateDraggablesMobile"
    :draggables-state="draggablesState"
    :minimised-draggables="minimisedDraggables"
  />
</template>
