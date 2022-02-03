<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";
import EDraggableTitlebar from "./EDraggableTitlebar.vue";

export type ContentType = "chat" | "text" | "image" | "video";

export type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
  contentType?: ContentType;
};

const props = defineProps<Draggable>();
const {
  draggableId,
  title,
  tilesWidth = 1,
  tilesHeight = 1,
  gridPosX = 0,
  gridPosY = 0,
} = props;

const emit = defineEmits<{
  (e: "minimise-draggable", draggable: Draggable): void;
}>();

const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();
const tileDivider = 20;
const tileSize = ref(windowWidth.value / tileDivider);

const { x, y, style, isDragging } = useDraggable(draggableRef, {
  preventDefault: true,
  onEnd: () => {
    calculateCoordinates();
  },
});

const calculateCoordinates = function () {
  tileSize.value = windowWidth.value / tileDivider;
  const snappedX = Math.round(x.value / tileSize.value);
  const snappedY = Math.round(y.value / tileSize.value);

  x.value =
    snappedX + tilesWidth >= tileDivider
      ? (tileDivider - tilesWidth) * tileSize.value
      : snappedX >= 0
      ? tileSize.value * snappedX
      : 0;
  y.value = snappedY >= 0 ? tileSize.value * snappedY : 0;

  localStorage.setItem(
    `draggable_${draggableId}`,
    JSON.stringify({ ...props, gridPosX: snappedX, gridPosY: snappedY }),
  );
};

const handleMinimise = () => {
  emit("minimise-draggable", { ...props });
};

onMounted(() => {
  const localData = localStorage.getItem(`draggable_${draggableId}`);
  if (localData) {
    const parsedLocalData = JSON.parse(localData);
    x.value = tileSize.value * parsedLocalData.gridPosX;
    y.value = tileSize.value * parsedLocalData.gridPosY;
  } else {
    x.value = tileSize.value * gridPosX;
    y.value = tileSize.value * gridPosY;
  }

  // window.addEventListener("resize", calculateCoordinates);
});
</script>

<template>
  <div
    class="EDraggable"
    :style="style"
    style="touch-action: none"
    :class="{ isDragging: isDragging }"
  >
    <button @click.stop="emit('minimise-draggable', { ...props })">ⅹ</button>
    <div ref="draggableRef">
      <EDraggableTitlebar
        :title="title"
        :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
      />
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
  touch-action: none;
}
.EDraggable.isDragging {
  z-index: 100;
}

.EDraggable article {
  width: 100%;
  height: 100%;
}

.EDraggable button {
  z-index: 2;
  height: var(--h-6);
  width: var(--w-6);
  position: absolute;
  top: 0;
  right: 0;
}
.EDraggable button:hover {
  background-color: var(--gray-300);
}
</style>
