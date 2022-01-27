<script setup lang="ts">
import EDraggableBar from "./EDraggableBar.vue";

type Electron = {
  title: string;
  electronId: string;
  initialSnappedX: number;
  initialSnappedY: number;
  tilesWidth: number;
  tilesHeight: number;
  isMinimised: boolean;
};

type Props = {
  electrons: Electron[];
};

const { electrons } = defineProps<Props>();

const emit = defineEmits<{
  (e: "update-electrons", electron: Electron): void;
}>();
</script>

<template>
  <nav class="EElectronsBar">
    <EDraggableBar
      v-for="electron in electrons"
      :title="electron.title"
      @click="emit('update-electrons', { ...electron, isMinimised: false })"
    />
  </nav>
</template>

<style scoped>
.EElectronsBar {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-left: var(--breadboard-tile-size);
  overflow-x: auto;
}

.EElectronsBar > * {
  flex: 1 1 16rem;
  min-width: 4rem;
  max-width: 16rem;
  margin-right: var(--m-3);
}
</style>
