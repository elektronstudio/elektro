<script setup lang="ts">
import EDraggableTitlebar from "./EDraggableTitlebar.vue";

type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
};

type Props = {
  draggables: Draggable[];
};

const { draggables } = defineProps<Props>();

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();
</script>

<template>
  <nav class="EElectronsBar">
    <EDraggableTitlebar
      v-for="draggable in draggables"
      :title="draggable.title"
      @click="emit('update-draggables', { ...draggable, isMinimised: false })"
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
