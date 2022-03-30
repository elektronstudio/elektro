<script setup lang="ts">
import { Draggable, useLive } from "../utils";
import ELiveView from "../components/ELiveView.vue";
import { ref } from "vue";

const data = [
  {
    title: "Stream",
    draggableId: "videosteam",
    contentType: "text",
    gridPosX: 2,
    gridPosY: 2,
    tilesWidth: 10,
    tilesHeight: 4,
    isMinimised: false,
    isMaximised: false,
    isMaximisable: true,
    order: 0,
    data: {
      src: "",
    },
  },
  {
    title: "Chat",
    draggableId: "chat",
    contentType: "chat",
    gridPosX: 15,
    gridPosY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
    order: 1,
  },
  {
    title: "About",
    draggableId: "about",
    contentType: "event",
    tilesWidth: 8,
    tilesHeight: 5,
    gridPosX: 1,
    gridPosY: 4,
    order: 2,
    data: {
      src: "",
    },
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
