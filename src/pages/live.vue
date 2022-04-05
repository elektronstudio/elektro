<script setup lang="ts">
import { Draggable, useLive } from "../utils";
import ELiveView from "../components/ELiveView.vue";
import { ref } from "vue";

const data = [
  {
    title: "Stream",
    draggableId: "videosteam",
    contentType: "text",
    gridPosX: 0,
    gridPosY: 1,
    tilesWidth: 15,
    tilesHeight: 7,
    isMinimised: false,
    isMaximised: false,
    isMaximisable: true,
    hideTitleBarOnIdle: true,
    order: 0,
    data: {
      src: "",
    },
  },
  {
    title: "Chat",
    draggableId: "chat",
    contentType: "chat",
    gridPosX: 16,
    gridPosY: 1,
    tilesWidth: 4,
    tilesHeight: 8,
    order: 1,
    chatMessages: 12,
    isAnchored: true,
  },
  {
    title: "About",
    draggableId: "about",
    contentType: "event",
    tilesWidth: 8,
    tilesHeight: 3,
    gridPosX: 1,
    gridPosY: 7,
    order: 2,
    data: {
      src: "",
    },
  },
  {
    title: "About",
    draggableId: "about-2",
    contentType: "event",
    tilesWidth: 8,
    tilesHeight: 3,
    gridPosX: 5,
    gridPosY: 8,
    order: 3,
    data: {
      src: "",
    },
  },
] as Draggable[];

const draggablesState = ref<Draggable[]>(data);

const { updateDraggablesDesktop, updateDraggablesMobile } = useLive({
  data,
  draggablesState,
});
</script>

<template>
  <ELiveView
    :data="data"
    :update-draggables-desktop="updateDraggablesDesktop"
    :update-draggables-mobile="updateDraggablesMobile"
    :draggables-state="draggablesState"
  />
</template>
