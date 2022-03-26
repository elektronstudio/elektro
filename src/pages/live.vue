<script setup lang="ts">
import { Draggable, useLive } from "../utils";
import ELiveView from "../components/ELiveView.vue";
import { ref } from "vue";

const data = [
  // {
  //   title: "Stream",
  //   draggableId: "videosteam",
  //   contentType: "video",
  //   gridPosX: 4,
  //   gridPosY: 2,
  //   tilesWidth: 6,
  //   tilesHeight: 4,
  //   isMinimised: false,
  //   order: 0,
  //   data: {
  //     src: "",
  //   },
  // },
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
    title: "Draggable 1",
    draggableId: "d-1",
    contentType: "event",
    tilesWidth: 4,
    tilesHeight: 3,
    gridPosX: 4,
    gridPosY: 2,
    order: 2,
    data: {
      src: "",
    },
  },
  {
    title: "Draggable 2",
    draggableId: "d-2",
    contentType: "event",
    tilesWidth: 4,
    tilesHeight: 5,
    gridPosX: 6,
    gridPosY: 2,
    order: 2,
    data: {
      src: "",
    },
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
