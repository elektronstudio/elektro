<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";

type Props = {
  title: string;
  moduleId: string;
  tilesWidth?: number;
  tilesHeight?: number;
  initialSnappedX?: number;
  initialSnappedY?: number;
};

const {
  title,
  moduleId,
  tilesWidth = 1,
  tilesHeight = 1,
  initialSnappedX = 0,
  initialSnappedY = 0,
} = defineProps<Props>();

const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();
const tileDivider = 20;
const tileSize = windowWidth.value / tileDivider;

const { x, y, style, isDragging } = useDraggable(draggableRef, {
  // initialValue: { x: 0, y: 0 },
  preventDefault: true,
  onEnd: () => {
    x.value =
      snappedX.value + tilesWidth >= 20
        ? (20 - tilesWidth) * tileSize
        : snappedX.value >= 0
        ? tileSize * snappedX.value
        : 0;
    y.value = snappedY.value >= 0 ? tileSize * snappedY.value : 0;
    localStorage.setItem(
      moduleId,
      JSON.stringify({ x: snappedX.value, y: snappedY.value }),
    );
  },
});

const snappedX = computed(() => Math.round(x.value / tileSize));
const snappedY = computed(() => Math.round(y.value / tileSize));

onMounted(() => {
  if (localStorage.getItem(moduleId)) {
    const { x: storedX, y: storedY } = JSON.parse(
      localStorage.getItem(moduleId)!,
    );
    x.value = tileSize * storedX;
    y.value = tileSize * storedY;
  } else {
    x.value = tileSize * initialSnappedX;
    y.value = tileSize * initialSnappedY;
  }
});
</script>

<template>
  <div
    class="EDraggable"
    ref="draggableRef"
    :style="style"
    style="touch-action: none"
  >
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
