<script setup lang="ts">
import { ref } from "vue";
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
import EElectronsBar from "../components/EElectronsBar.vue";

type Electron = {
  title: string;
  id: string;
  initialSnappedX: number;
  initialSnappedY: number;
  tilesWidth: number;
  tilesHeight: number;
};

const electrons = [
  {
    title: "Electron 1",
    id: "draggable-electron-1",
    initialSnappedX: 4,
    initialSnappedY: 2,
    tilesWidth: 4,
    tilesHeight: 4,
  },
  {
    title: "Electron 2",
    id: "draggable-electron-2",
    initialSnappedX: 8,
    initialSnappedY: 6,
    tilesWidth: 6,
    tilesHeight: 2,
  },
  {
    title: "Extra long title, with long text",
    id: "draggable-electron-3",
    initialSnappedX: 2,
    initialSnappedY: 10,
    tilesWidth: 2,
    tilesHeight: 2,
  },
] as Electron[];

const minimisedElectrons = ref([] as Electron[]);

const addMinimizedElectron = (electronId: string) => {
  const electron = electrons.find((m) => m.id === electronId);
  if (electron && !minimisedElectrons.value.some((m) => m.id === electron.id)) {
    minimisedElectrons.value.push(electron);
  } else if (electron) {
    minimisedElectrons.value = minimisedElectrons.value.filter(
      (electron) => electron.id !== electronId,
    );
  }
};
</script>

<template>
  <EBreadBoard>
    <template v-for="electron in electrons">
      <EDraggable
        v-if="!minimisedElectrons.some((m) => m.id === electron.id)"
        :title="electron.title"
        :electron-id="electron.id"
        :tiles-width="electron.tilesWidth"
        :tiles-height="electron.tilesHeight"
        :initial-snapped-x="electron.initialSnappedX"
        :initial-snapped-y="electron.initialSnappedY"
        @minimise-electron="addMinimizedElectron"
      />
    </template>
    <EElectronsBar
      :electrons="minimisedElectrons"
      @unminimise-electron="addMinimizedElectron"
    />
  </EBreadBoard>
</template>
