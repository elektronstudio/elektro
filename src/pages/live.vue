<script setup lang="ts">
import { shallowRef, watch, onMounted, computed } from "vue";
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
import EElectronsBar from "../components/EElectronsBar.vue";

type Draggable = {
  title: string;
  electronId: string;
  initialSnappedX: number;
  initialSnappedY: number;
  tilesWidth: number;
  tilesHeight: number;
  isMinimised: boolean;
};

const electrons = [
  {
    title: "Electron 1",
    electronId: "draggable-electron-1",
    initialSnappedX: 1,
    initialSnappedY: 1,
    tilesWidth: 4,
    tilesHeight: 4,
    isMinimised: false,
  },
  {
    title: "Electron 2",
    electronId: "draggable-electron-2",
    initialSnappedX: 6,
    initialSnappedY: 1,
    tilesWidth: 6,
    tilesHeight: 2,
    isMinimised: false,
  },
  {
    title: "Extra long title, with long text",
    electronId: "draggable-electron-3",
    initialSnappedX: 1,
    initialSnappedY: 6,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: false,
  },
  {
    title: "Electron 4",
    electronId: "draggable-electron-4",
    initialSnappedX: 5,
    initialSnappedY: 5,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: false,
  },
  {
    title: "Electron 5",
    electronId: "draggable-electron-5",
    initialSnappedX: 8,
    initialSnappedY: 5,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
  {
    title: "Electron 6",
    electronId: "draggable-electron-6",
    initialSnappedX: 11,
    initialSnappedY: 4,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
  {
    title: "Electron 7",
    electronId: "draggable-electron-7",
    initialSnappedX: 4,
    initialSnappedY: 10,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
  {
    title: "Electron 8",
    electronId: "draggable-electron-8",
    initialSnappedX: 7,
    initialSnappedY: 10,
    tilesWidth: 2,
    tilesHeight: 2,
    isMinimised: true,
  },
] as Draggable[];

const electronsState = shallowRef<Draggable[]>([]);

const updateElectronState = (electron: Draggable) => {
  if (!electron) {
    return;
  }

  electronsState.value = electronsState.value.filter(
    (m) => m.electronId !== electron.electronId,
  );
  electronsState.value.push(electron);
};

const activeElectrons = computed(() => {
  return electronsState.value.filter((m) => !m.isMinimised);
});
const minimisedElectrons = computed(() =>
  electronsState.value.filter((m) => m.isMinimised),
);

watch(electronsState, () => {
  if (electronsState.value.length > 0) {
    localStorage.setItem("windowsState", JSON.stringify(electronsState.value));
  }
});

onMounted(() => {
  if (localStorage.getItem("windowsState")) {
    const localState = JSON.parse(localStorage.getItem("windowsState")!);
    electronsState.value = localState;
  } else {
    electronsState.value = electrons;
  }
});
</script>

<template>
  <EBreadBoard>
    <template v-for="electron in activeElectrons" :key="electron.electronId">
      <EDraggable
        :title="electron.title"
        :electron-id="electron.electronId"
        :tiles-width="electron.tilesWidth"
        :tiles-height="electron.tilesHeight"
        :initial-snapped-x="electron.initialSnappedX"
        :initial-snapped-y="electron.initialSnappedY"
        :is-minimised="electron.isMinimised"
        @update-electrons="updateElectronState"
      />
    </template>
    <EElectronsBar
      :electrons="minimisedElectrons"
      @update-electrons="updateElectronState"
    />
  </EBreadBoard>
</template>
