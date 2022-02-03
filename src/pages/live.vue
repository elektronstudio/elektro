<script setup lang="ts">
import { shallowRef, watch, onMounted, computed, ref } from "vue";
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
import EDraggablesDock from "../components/EDraggablesDock.vue";
import EChat from "../components/EChat.vue";

type ContentType = "chat" | "text" | "image" | "video";

type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
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
  },
  {
    title: "Electron 2",
    draggableId: "draggable-electron-2",
    gridPosX: 6,
    gridPosY: 1,
    tilesWidth: 6,
    tilesHeight: 2,
    isMinimised: false,
  },
  {
    title: "Extra long title, with long text",
    draggableId: "draggable-electron-3",
    gridPosX: 1,
    gridPosY: 6,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: false,
  },
  {
    title: "Electron 4",
    draggableId: "draggable-electron-4",
    gridPosX: 5,
    gridPosY: 5,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: false,
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
    title: "Electron 6",
    draggableId: "draggable-electron-6",
    gridPosX: 11,
    gridPosY: 4,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
  {
    title: "Electron 7",
    draggableId: "draggable-electron-7",
    gridPosX: 4,
    gridPosY: 10,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
  {
    title: "Electron 8",
    draggableId: "draggable-electron-8",
    gridPosX: 7,
    gridPosY: 10,
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

const minimiseDraggable = (draggable: Draggable) => {
  if (!draggable) {
    return;
  }
  const { draggableId } = draggable;
  minimisedDraggables.value = [...minimisedDraggables.value, draggableId];
  localStorage.setItem(
    `draggable_${draggableId}`,
    JSON.stringify({ ...draggable, isMinimised: true }),
  );
};

const unMinimiseDraggable = (draggable: Draggable) => {
  if (!draggable) {
    return;
  }
  const { draggableId } = draggable;
  minimisedDraggables.value = [
    ...minimisedDraggables.value.filter((id) => id !== draggableId),
  ];
  localStorage.setItem(
    `draggable_${draggableId}`,
    JSON.stringify({ ...draggable, isMinimised: false }),
  );
};

const minimisedDraggables = ref<string[]>([]);

const activeDraggables = computed(() => {
  return draggablesData.filter(
    (m) => !minimisedDraggables.value.includes(m.draggableId),
  );
});

onMounted(() => {
  draggablesData.forEach((draggable) => {
    const { draggableId } = draggable;
    const localData = localStorage.getItem(`draggable_${draggableId}`);

    const mergedDraggable = localData
      ? { ...draggable, ...JSON.parse(localData!) }
      : { ...draggable };

    if (mergedDraggable.isMinimised) {
      minimisedDraggables.value.push(draggableId);
    }
  });
});
</script>

<template>
  <EBreadBoard>
    <template
      v-for="(draggable, index) in activeDraggables"
      :key="draggable.draggableId"
    >
      <EDraggable
        :title="draggable.title"
        :draggable-id="draggable.draggableId"
        :tiles-width="draggable.tilesWidth"
        :tiles-height="draggable.tilesHeight"
        :grid-pos-x="draggable.gridPosX"
        :grid-pos-y="draggable.gridPosY"
        :is-minimised="draggable.isMinimised"
        :content-type="draggable.contentType"
        @minimise-draggable="minimiseDraggable"
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
      :draggables="
        draggablesData.filter((m) =>
          minimisedDraggables.includes(m.draggableId),
        )
      "
      @unminimise-draggable="unMinimiseDraggable"
    />
  </EBreadBoard>
</template>
