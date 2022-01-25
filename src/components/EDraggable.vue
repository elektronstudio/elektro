<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { useMouse } from "../lib/mouse";
import { useWindow } from "../lib/window";

const props = defineProps({ x: { default: null }, y: { default: null } });
const emit = defineEmits<{
  (e: "dragClick", payload: { x: number; y: number }): void;
  (e: "drag", payload: { x: number; y: number }): void;
}>();
const draggableRef = ref<HTMLDivElement | null>(null);
const x = ref<number | null>(0);
const y = ref<number | null>(0);

watch(
  [() => props.x, () => props.y],
  () => {
    x.value = props.x;
    y.value = props.y;
  },
  { immediate: true },
);
const { mouseX, mouseY } = useMouse();
const { width: windowWidth, height: windowHeight } = useWindow();

const dragStarted = ref(false);
const touchDragStarted = ref(false);
const offsetX = ref<number | null>(null);
const offsetY = ref<number | null>(null);
const initialX = ref<number | null>(null);
const initialY = ref<number | null>(null);

const onMousedown = () => {
  if (
    mouseX.value === null ||
    mouseY.value === null ||
    draggableRef.value === null
  ) {
    return;
  }

  dragStarted.value = true;
  offsetX.value = mouseX.value - draggableRef.value.offsetLeft;
  offsetY.value = mouseY.value - draggableRef.value.offsetTop;
  initialX.value = mouseX.value;
  initialY.value = mouseY.value;
};

const onMouseup = () => {
  if (
    mouseX.value === null ||
    mouseY.value === null ||
    initialX.value === null ||
    initialY.value === null
  ) {
    return;
  }

  dragStarted.value = false;
  offsetX.value = null;
  offsetY.value = null;
  if (
    initialX.value - mouseX.value === 0 &&
    initialY.value - mouseY.value === 0
  ) {
    emit("dragClick", { x: mouseX.value, y: mouseY.value });
  }
};

const onTouchstart = (e: TouchEvent) => {
  if (draggableRef.value === null) {
    return;
  }

  dragStarted.value = true;
  offsetX.value = e.changedTouches[0].pageX - draggableRef.value.offsetLeft;
  offsetY.value = e.changedTouches[0].pageY - draggableRef.value.offsetTop;
};

const onTouchend = (e: TouchEvent) => {
  dragStarted.value = false;
  offsetX.value = null;
  offsetY.value = null;
  if (!touchDragStarted.value) {
    emit("dragClick", {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  }
  touchDragStarted.value = false;
};

watch([() => mouseX.value, () => mouseY.value], () => {
  if (
    !dragStarted.value ||
    mouseX.value === null ||
    mouseY.value === null ||
    offsetX.value === null ||
    offsetY.value === null
  ) {
    return;
  }

  touchDragStarted.value = true;
  const dragX = mouseX.value - offsetX.value;
  const dragY = mouseY.value - offsetY.value;
  x.value = dragX;
  y.value = dragY;
  emit("drag", { x: dragX, y: dragY });
});

// const calculateWindowPosition = () => {
//   const tileDivider = 20;
//   const tileSize = windowWidth.value / tileDivider;
//   const nextTileStepX = Math.round(dragX / tileSize);
//   const nextTileStepY = Math.round(dragY / tileSize);

//   if (
//     (nextTileStepX >= 0 && dragX !== nextTileStepX) ||
//     (nextTileStepY >= 0 && dragY !== nextTileStepY)
//   ) {
//     console.log({ nextTileStepX, nextTileStepY });
//     // x.value = (100 / tileDivider) * nextTileStepX;
//     // y.value = (100 / tileDivider) * nextTileStepY;
//   }
// };

const style = computed(() => {
  return {
    position: "fixed",
    left: `${x.value ? x.value : 0}px`,
    top: `${y.value ? y.value : 0}px`,
    cursor: dragStarted.value ? "grabbing" : "grab",
  };
});
</script>

<template>
  <div
    ref="draggableRef"
    :style="style"
    @mousedown.stop.prevent="onMousedown"
    @touchstart.stop.prevent="onTouchstart"
    @mouseup.stop.prevent="onMouseup"
    @touchend.stop.prevent="onTouchend"
  >
    <slot />
  </div>
</template>
