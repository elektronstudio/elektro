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
    title: "Electron 4",
    draggableId: "draggable-electron-4",
    gridPosX: 5,
    gridPosY: 5,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: false,
    order: 1,
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
    order: 3,
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
const draggablesState = ref<Draggable[]>([]);
const minimisedDraggables = computed(() =>
  draggablesState.value.filter((m) => m.isMinimised),
);
watch(draggablesState, () => {
  if (draggablesState.value.length > 0) {
    localStorage.setItem("windowsState", JSON.stringify(draggablesState.value));
  }
});

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

const updateDraggablesState = (draggable: Draggable) => {
  if (!draggable) {
    return;
  }
  const { draggableId, order } = draggable;
  draggablesState.value = draggablesState.value.map((item) => {
    if (item.draggableId === draggableId) {
      return { ...draggable, order: draggablesState.value.length };
    } else {
      return {
        ...item,
        order:
          item.order === 1
            ? 1
            : item.order > order
            ? item.order - 1
            : item.order,
      };
    }
  });
};

onMounted(() => {
  const initialStates = [] as Draggable[];
  const localData = localStorage.getItem(`windowsState`);
  const localDataParsed = localData ? JSON.parse(localData) : undefined;

  draggablesData.forEach((draggable) => {
    const { draggableId } = draggable;
    const localDraggable = localDataParsed?.find(
      (m: Draggable) => m.draggableId === draggableId,
    );
    const mergedDraggable = localDraggable
      ? {
          ...draggable,
          gridPosX: localDraggable.gridPosX,
          gridPosY: localDraggable.gridPosY,
          isMinimised: localDraggable.isMinimised,
        }
      : { ...draggable };

    if (mergedDraggable.order === undefined) {
      mergedDraggable.order = 1;
    }
    initialStates.push(mergedDraggable);
  });
  draggablesState.value = initialStates;
});
</script>

<template>
  <EBreadBoard>
    <template
      v-for="(draggable, index) in draggablesState"
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
