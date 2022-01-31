<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";
import EDraggableBar from "./EDraggableBar.vue";

type Draggable = {
  title: string;
  electronId: string;
  initialSnappedX: number;
  initialSnappedY: number;
  tilesWidth: number;
  tilesHeight: number;
  isMinimised: boolean;
};

const props = defineProps<Draggable>();
const {
  title,
  electronId,
  tilesWidth = 1,
  tilesHeight = 1,
  initialSnappedX = 0,
  initialSnappedY = 0,
} = props;

const emit = defineEmits<{
  (e: "update-electrons", value: Draggable): void;
}>();

const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();
const tileDivider = 20;
const tileSize = ref(windowWidth.value / tileDivider);

const { x, y, style, isDragging } = useDraggable(draggableRef, {
  preventDefault: true,
  onEnd: () => {
    calculateCoordinates();
    if (electronId === "draggable-electron-1") {
      console.log(x.value);
    }
    if (
      initialSnappedX !== snappedX.value ||
      initialSnappedY !== snappedY.value
    ) {
      emit("update-electrons", {
        ...props,
        initialSnappedX: snappedX.value,
        initialSnappedY: snappedY.value,
      });
    }
  },
});

const snappedX = computed(() => Math.round(x.value / tileSize.value));
const snappedY = computed(() => Math.round(y.value / tileSize.value));

const minimiseElectron = () => {
  emit("update-electrons", { ...props, isMinimised: true });
};

const calculateCoordinates = function () {
  tileSize.value = windowWidth.value / tileDivider;

  x.value =
    snappedX.value + tilesWidth >= 20
      ? (20 - tilesWidth) * tileSize.value
      : snappedX.value >= 0
      ? tileSize.value * snappedX.value
      : 0;
  y.value = snappedY.value >= 0 ? tileSize.value * snappedY.value : 0;
};

onMounted(() => {
  x.value = tileSize.value * initialSnappedX;
  y.value = tileSize.value * initialSnappedY;

  window.addEventListener("resize", calculateCoordinates);
});
</script>

<template>
  <div
    class="EDraggable"
    :style="style"
    style="touch-action: none"
    :class="{ isDragging: isDragging }"
  >
    <button @click.stop="minimiseElectron">ⅹ</button>
    <div ref="draggableRef">
      <EDraggableBar
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
  padding: var(--p-2);
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
