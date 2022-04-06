<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";
import EDraggableTitlebar from "./EDraggableTitlebar.vue";
import { desktop, Draggable } from "../utils";
import ETitlebarButton from "./ETitlebarButton.vue";

type Props = {
  idle?: boolean;
  draggable: Draggable;
};

const props = defineProps<Props>();
// Note, following values are not reactive
const {
  tilesWidth = 1,
  tilesHeight,
  isMaximisable,
  hideTitleBarOnIdle,
} = props.draggable;

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();

const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();
const tileDivider = computed(() => (desktop ? 20 : 10));
const tileSize = ref(windowWidth.value / tileDivider.value);

// @TODO: Simplify this
// how to set default value 0 to nested prop
const gridPosX = computed(() =>
  props.draggable.gridPosX ? props.draggable.gridPosX : 0,
);
const gridPosY = computed(() =>
  props.draggable.gridPosY ? props.draggable.gridPosY : 0,
);

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
        ...props.draggable,
        gridPosX: snappedX.value,
        gridPosY: snappedY.value,
      });
    }
  },
});

const snappedX = computed(() => Math.round(x.value / tileSize.value));
const snappedY = computed(() => Math.round(y.value / tileSize.value));

const calculateCoordinates = function () {
  tileSize.value = windowWidth.value / tileDivider.value;
  const snappedX = Math.round(x.value / tileSize.value);
  const snappedY = Math.round(y.value / tileSize.value);
  x.value =
    snappedX + tilesWidth >= tileDivider.value
      ? (tileDivider.value - tilesWidth) * tileSize.value
      : snappedX >= 0
      ? tileSize.value * snappedX
      : 0;
  y.value = snappedY >= 0 ? tileSize.value * snappedY : 0;
};

const handleResize = () => {
  calculateCoordinates();
};

onMounted(() => {
  x.value = tileSize.value * gridPosX.value;
  y.value = tileSize.value * gridPosY.value;

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

function findCoordinates(el: Element, done: () => void) {
  // @TODO: Find a better solution for this
  // Consider using refs for selectors
  const $draggableDocked = document.querySelector(
    `.EDraggablesDock .EDraggableTitlebar[data-id="${props.draggable.draggableId}"]`,
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
      :class="{
        isDragging: isDragging,
        noHeight: !tilesHeight,
        isMaximised: props.draggable.isMaximised,
        hideTitleBarOnIdle: hideTitleBarOnIdle,
        idle: idle,
      }"
      v-show="!draggable.isMinimised"
    >
      <nav class="topBarNav">
        <ETitlebarButton
          v-if="isMaximisable"
          icon="size"
          @click.stop="
            emit('update-draggables', {
              ...draggable,
              isMaximised: !draggable.isMaximised,
            })
          "
        />
        <ETitlebarButton
          icon="minus"
          @click.stop="
            emit('update-draggables', {
              ...draggable,
              isMinimised: true,
              isMaximised: false,
            })
          "
        />
      </nav>
      <div class="titleBar" ref="draggableRef">
        <EDraggableTitlebar
          :title="props.draggable.title"
          :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
        />
      </div>
      <article
        :style="{
          height: tilesHeight
            ? `calc(${tilesHeight} * var(--breadboard-tile-size) - var(--h-6))`
            : 'auto',
        }"
      >
        <slot />
      </article>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes windowAnimation {
  75% {
    opacity: 1;
  }
  100% {
    bottom: 0;
    width: 0;
    height: var(--h-6);
    opacity: 0;
  }
}
.EDraggable {
  position: relative;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  z-index: calc(v-bind("props.draggable.order") + 1);
  border: 1px solid transparent;
}
.EDraggable:hover {
  border: 1px solid var(--gray-500);
}
.EDraggable.isDragging {
  z-index: 100;
}
.EDraggable.hideTitleBarOnIdle .titleBar {
  position: absolute;
  z-index: 1;
  width: 100%;
}
.EDraggable.hideTitleBarOnIdle :is(.titleBar, .topBarNav),
.EDraggable.idle :is(.titleBar, .topBarNav) {
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.EDraggable.hideTitleBarOnIdle:not(.idle):hover :is(.titleBar, .topBarNav) {
  opacity: 1;
}
.EDraggable.hideTitleBarOnIdle article {
  padding-top: 0;
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

  overflow-y: auto;
}

.topBarNav {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}

/* @TODO: Add breakpoints system */
@media only screen and (max-width: 899px) {
  .EDraggable {
    top: auto !important;
    left: auto !important;
  }
}
@media only screen and (min-width: 900px) {
  .EDraggable {
    position: fixed;
    width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
    height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
    touch-action: none;
  }
  .EDraggable.noHeight {
    height: auto;
  }
  .EDraggable.isMaximised {
    width: 100%;
    height: 100%;
    top: 0 !important;
    left: 0 !important;
  }
  .EDraggable.isMaximised article,
  /* @TODO: How to select an Art only component */
  .EDraggable.isMaximised article :deep(.videoStream),
  .EDraggable.isMaximised :deep(video) {
    height: 100%;
  }
  .EDraggable.isMaximised video {
    object-fit: contain;
  }
  @keyframes windowAnimation {
    0% {
      /* top: v-bind("`${y}px`");
      left: v-bind("`${x}px`"); */
      width: calc(v-bind(tilesWidth) * var(--breadboard-tile-size));
      height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
    }
    100% {
      top: v-bind("`${finalAnimation?.y ? finalAnimation.y : 0}px`");
      left: v-bind(
        "`calc(${finalAnimation?.x ? finalAnimation.x : 0}px + var(--dock-item-size) / 2)`"
      );
      width: 0;
      height: var(--h-6);
      opacity: 0;
    }
  }
}
</style>
