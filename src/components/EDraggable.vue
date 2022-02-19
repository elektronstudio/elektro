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
  order: number;
};

const props = defineProps<Draggable>();
const { draggableId, title, tilesWidth = 1, tilesHeight = 1 } = props;

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();

const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();
const tileDivider = 20;
const tileSize = ref(windowWidth.value / tileDivider);
// @TODO: Why don't props trigger rerender?
const gridPosX = ref<number>(props.gridPosX ? props.gridPosX : 0);
const gridPosY = ref<number>(props.gridPosY ? props.gridPosY : 0);
const isMinimised = ref<boolean>(props.isMinimised ? props.isMinimised : false);
const order = ref<number>(props.order);
const finalAnimation = ref<DOMRect | undefined>();

const { x, y, style, isDragging } = useDraggable(draggableRef, {
  preventDefault: true,
  onEnd: () => {
    calculateCoordinates();

    if (
      gridPosX.value !== snappedX.value ||
      gridPosY.value !== snappedY.value
    ) {
      emit("update-draggables", {
        ...props,
        gridPosX: snappedX.value,
        gridPosY: snappedY.value,
      });
    }
  },
});

const snappedX = computed(() => Math.round(x.value / tileSize.value));
const snappedY = computed(() => Math.round(y.value / tileSize.value));

watch(props, (newValue, oldValue) => {
  isMinimised.value = newValue.isMinimised ? newValue.isMinimised : false;
  order.value = newValue.order;
  gridPosX.value = newValue.gridPosX ? newValue.gridPosX : 0;
  gridPosY.value = newValue.gridPosY ? newValue.gridPosY : 0;
  // @TODO: Why does dis not work?
  // if (newValue.isMinimised !== oldValue.isMinimised) {
  // isMinimised.value = newValue.isMinimised;
  // }
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
};

onMounted(() => {
  x.value = tileSize.value * gridPosX.value;
  y.value = tileSize.value * gridPosY.value;

  // window.addEventListener("resize", calculateCoordinates);
});

function findCoordinates(el: Element, done: () => void) {
  // @TODO: Find a better solution for this
  const $draggableDocked = document.querySelector(
    `.EDraggablesDock .EDraggableTitlebar[data-id="${draggableId}"]`,
  );
  const draggableDockedRect = $draggableDocked?.getBoundingClientRect();
  finalAnimation.value = draggableDockedRect;

  el.addEventListener("animationend", () => {
    done();
  });
}
</script>

<template>
  <Transition @enter="findCoordinates" @leave="findCoordinates">
    <div
      class="EDraggable"
      :style="style"
      style="touch-action: none"
      :class="{ isDragging: isDragging }"
      v-show="!isMinimised"
    >
      <button
        @click.stop="emit('update-draggables', { ...props, isMinimised: true })"
      >
        ⅹ
      </button>
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
  </Transition>
</template>

<style scoped>
@keyframes windowAnimation {
  0% {
    top: v-bind("`${y}px`");
    left: v-bind("`${x}px`");
    width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
    height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
  }
  75% {
    opacity: 1;
  }
  100% {
    top: v-bind("`${finalAnimation?.y}px`");
    left: v-bind("`${finalAnimation?.x + finalAnimation?.width}px`");
    width: 0;
    height: var(--h-6);
    opacity: 0;
  }
}
.EDraggable {
  position: fixed;
  width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
  height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
  background-color: var(--bg);
  touch-action: none;
  display: flex;
  flex-direction: column;
  z-index: calc(v-bind(order) + 1);
}
.EDraggable.isDragging {
  z-index: 100;
}
.EDraggable.v-enter-active {
  animation: windowAnimation 0.5s ease-in-out reverse;
}

.EDraggable.v-leave-active {
  animation: windowAnimation 0.5s ease-in-out forwards;
}
.EDraggable.v-enter-active *,
.EDraggable.v-leave-active * {
  display: none;
}
.EDraggable article {
  flex-grow: 1;
  height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size) - var(--h-6));
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
