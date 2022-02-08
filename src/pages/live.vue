<script setup lang="ts">
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
import EDraggablesDock from "../components/EDraggablesDock.vue";
import EChat from "../components/EChat.vue";
import { useDraggable } from "../utils/draggables";

type ContentType = "chat" | "text" | "image" | "video";

type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
  order: number;
  contentType?: ContentType;
};

const draggablesData = [
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
    title: "Extra long title, with long text",
    draggableId: "draggable-electron-3",
    gridPosX: 1,
    gridPosY: 6,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: false,
    order: 5,
  },
  {
    title: "Electron 5",
    draggableId: "draggable-electron-5",
    gridPosX: 8,
    gridPosY: 5,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
  {
    title: "Electron new",
    draggableId: "draggable-electron-new",
    gridPosX: 12,
    gridPosY: 10,
    tilesWidth: 5,
    tilesHeight: 5,
  },
  {
    title: "Electron new 2",
    draggableId: "draggable-electron-new-2",
  },
  {
    title: "Chat",
    draggableId: "elektron-chat",
    contentType: "chat",
    tilesWidth: 4,
    tilesHeight: 6,
  },
] as Draggable[];
const { draggablesState, minimisedDraggables, updateDraggablesState } =
  useDraggable(draggablesData);

const findComponent = (contentType: ContentType) => {
  let componentName;
  switch (contentType) {
    case "chat":
      componentName = "e-chat";
      break;

    default:
      break;
  }

  return componentName;
};
</script>

<template>
  <EBreadBoard>
    <template v-for="draggable in draggablesState" :key="draggable.draggableId">
      <EDraggable
        :title="draggable.title"
        :draggable-id="draggable.draggableId"
        :tiles-width="draggable.tilesWidth"
        :tiles-height="draggable.tilesHeight"
        :grid-pos-x="draggable.gridPosX"
        :grid-pos-y="draggable.gridPosY"
        :is-minimised="draggable.isMinimised"
        :content-type="draggable.contentType"
        :order="draggable.order"
        @update-draggables="updateDraggablesState"
      >
        <!-- @TODO: How to make dynamic components work -->
        <!-- <component
          v-if="draggable.contentType"
          :is="findComponent(draggable.contentType)"
        /> -->
        <EChat v-if="draggable.contentType === 'chat'" />
      </EDraggable>
    </template>
    <EDraggablesDock
      :draggables="minimisedDraggables"
      @update-draggables="updateDraggablesState"
    />
  </EBreadBoard>
</template>
