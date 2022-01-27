<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";
import EDraggableBar from "./EDraggableBar.vue";

type Props = {
  title: string;
  electronId: string;
  tilesWidth?: number;
  tilesHeight?: number;
  initialSnappedX?: number;
  initialSnappedY?: number;
};

const {
  title,
  electronId,
  tilesWidth = 1,
  tilesHeight = 1,
  initialSnappedX = 0,
  initialSnappedY = 0,
} = defineProps<Props>();

const emit = defineEmits<{
  (e: "minimise-electron", value: string): void;
}>();

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
      electronId,
      JSON.stringify({ x: snappedX.value, y: snappedY.value }),
    );
  },
});

const snappedX = computed(() => Math.round(x.value / tileSize));
const snappedY = computed(() => Math.round(y.value / tileSize));

onMounted(() => {
  if (localStorage.getItem(electronId)) {
    const { x: storedX, y: storedY } = JSON.parse(
      localStorage.getItem(electronId)!,
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
  <div class="EDraggable" :style="style" style="touch-action: none">
    <div ref="draggableRef">
      <EDraggableBar
        :title="title"
        :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      >
        <button @click="emit('minimise-electron', electronId)">X</button>
      </EDraggableBar>
    </div>
    <article>
      <slot />
    </article>
  </div>
</template>

<style scoped>
.EDraggable {
  position: fixed;
  width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
  height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
  background-color: var(--bg);
}

.EDraggable article {
  padding: var(--p-2);
}
</style>
