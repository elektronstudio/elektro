<script setup lang="ts">
import { shallowRef, watch, onMounted, computed, ref } from "vue";
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
import EDraggablesDock from "../components/EDraggablesDock.vue";

type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
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
] as Draggable[];

const draggablesState = ref<Draggable[]>([]);

const updateDraggablesState = (draggable: Draggable) => {
  if (!draggable) {
    return;
  }
  draggablesState.value = draggablesState.value.filter(
    (m) => m.draggableId !== draggable.draggableId,
  );
  draggablesState.value.push(draggable);
};

const activeDraggables = computed(() => {
  return draggablesState.value.filter((m) => !m.isMinimised);
});

const minimisedDraggables = computed(() =>
  draggablesState.value.filter((m) => m.isMinimised),
);

watch(draggablesState, () => {
  if (draggablesState.value.length > 0) {
    localStorage.setItem("windowsState", JSON.stringify(draggablesState.value));
  }
});

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
      ? { ...draggable, ...localDraggable }
      : { ...draggable };
    initialStates.push(mergedDraggable);
  });
  draggablesState.value = initialStates;
});
</script>

<template>
  <EBreadBoard>
    <template
      v-for="(draggable, index) in activeDraggables"
      :key="`${draggable.draggableId}-${index}`"
    >
      <EDraggable
        :title="draggable.title"
        :draggable-id="draggable.draggableId"
        :tiles-width="draggable.tilesWidth"
        :tiles-height="draggable.tilesHeight"
        :grid-pos-x="draggable.gridPosX"
        :grid-pos-y="draggable.gridPosY"
        :is-minimised="draggable.isMinimised"
        @update-draggables="updateDraggablesState"
      />
    </template>
    <EDraggablesDock
      :draggables="minimisedDraggables"
      @update-draggables="updateDraggablesState"
    />
  </EBreadBoard>
</template>
