<script setup lang="ts">
import EDraggableBar from "./EDraggableBar.vue";

type Electron = {
  title: string;
  id: string;
  initialSnappedX: number;
  initialSnappedY: number;
  tilesWidth: number;
  tilesHeight: number;
};

type Props = {
  electrons: Electron[];
};

const { electrons } = defineProps<Props>();

const emit = defineEmits<{
  (e: "unminimise-electron", value: string): void;
}>();
</script>

<template>
  <nav class="EElectronsBar">
    <EDraggableBar
      v-for="electron in electrons"
      :title="electron.title"
      @click="emit('unminimise-electron', electron.id)"
    />
  </nav>
</template>

<style scoped>
.EElectronsBar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: var(--breadboard-tile-size);
}

.EElectronsBar > * {
  width: 16rem;
  margin-right: var(--m-3);
}
</style>
