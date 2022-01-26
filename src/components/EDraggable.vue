<script setup lang="ts">
import { ref, computed } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";

type Props = {
  title: string;
  tilesWidth?: number;
  tilesHeight?: number;
  initialX?: number;
  initialY?: number;
};

const { title, tilesWidth, tilesHeight, initialX, initialY } =
  defineProps<Props>();
const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();

const calculateSnappedPosition = (pos: any) => {
  const tileDivider = 20;
  const tileSize = windowWidth.value / tileDivider;
  const nextTileStep = Math.round(pos.value / tileSize);

  return nextTileStep >= 0 ? tileSize * nextTileStep : 0;
};

const snappedX = computed(() => calculateSnappedPosition(x));
const snappedY = computed(() => calculateSnappedPosition(y));

const { x, y, style, isDragging } = useDraggable(draggableRef, {
  initialValue: { x: 0, y: 0 },
  preventDefault: true,
  onEnd: () => {
    x.value = snappedX.value;
    y.value = snappedY.value;
  },
});
</script>

<template>
  <div v-if="isDragging" class="GhostFrame" :style="style" />
  <div class="EDraggable" ref="draggableRef" style="touch-action: none">
    <nav>
      <h6>{{ title }}</h6>
      <button>X</button>
    </nav>
    <div>{{ Math.round(x) }}, {{ Math.round(y) }}</div>
  </div>
</template>

<style scoped>
.EDraggable {
  position: fixed;
  width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
  height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
  background-color: var(--bg);
  top: calc(v-bind(snappedY) * 1px);
  left: calc(v-bind(snappedX) * 1px);
}
.GhostFrame {
  border: 1px solid var(--accent);
  position: fixed;
  width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
  height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
}
.EDraggable nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: 1.2rem;
}
.EDraggable nav h6 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
}
.EDraggable nav:hover {
  background-color: var(--gray-600);
}
</style>
