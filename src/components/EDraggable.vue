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
const tileSize = windowWidth.value / tileDivider;

const { x, y, isDragging } = useDraggable(draggableRef, {
  preventDefault: true,
  onEnd: () => {
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

const snappedX = computed(() => Math.round(x.value / tileSize));
const snappedY = computed(() => Math.round(y.value / tileSize));

const style = computed(() => {
  if (isDragging.value) {
    return {
      top: `${y.value}px`,
      left: `${x.value}px`,
    };
  } else {
    return {
      top: `calc(${snappedY.value} * var(--breadboard-tile-size))`,
      left: `calc(${snappedX.value} * var(--breadboard-tile-size))`,
    };
  }
});

const minimiseElectron = () => {
  emit("update-electrons", { ...props, isMinimised: true });
};

onMounted(() => {
  x.value = tileSize * initialSnappedX;
  y.value = tileSize * initialSnappedY;
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
