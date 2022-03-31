<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useWindow } from "../lib/window";
import { useDraggable } from "@vueuse/core";
import EDraggableTitlebar from "./EDraggableTitlebar.vue";
import { desktop, Draggable } from "../utils";

type Props = {
  draggable: Draggable;
};

const props = defineProps<Props>();
// Note, following values are not reactive
const { tilesWidth = 1, tilesHeight, isMaximisable } = props.draggable;

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();

const draggableRef = ref<HTMLElement | null>(null);
const { width: windowWidth } = useWindow();
const tileDivider = computed(() => (desktop ? 20 : 10));
const tileSize = ref(windowWidth.value / tileDivider.value);

// @TODO: Why don't props trigger rerender?
const gridPosX = computed(() =>
  props.draggable.gridPosX ? props.draggable.gridPosX : 0,
);
const gridPosY = computed(() =>
  props.draggable.gridPosY ? props.draggable.gridPosY : 0,
);
const order = computed(() => props.draggable.order);
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
        noHeight: tilesHeight,
        isVideo: draggable.contentType === 'video',
        isMaximised: props.draggable.isMaximised,
      }"
      v-show="!draggable.isMinimised"
    >
      <nav class="topBarNav">
        <button
          v-if="isMaximisable"
          @click.stop="
            emit('update-draggables', {
              ...draggable,
              isMaximised: !draggable.isMaximised,
            })
          "
        >
          <!-- @TODO: add icons system to Elektro -->
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <button
          @click.stop="
            emit('update-draggables', {
              ...draggable,
              isMinimised: true,
              isMaximised: false,
            })
          "
        >
          <!-- @TODO: add icons system to Elektro -->

          <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 7.5C1.25 7.22386 1.47386 7 1.75 7H13.25C13.5261 7 13.75 7.22386 13.75 7.5C13.75 7.77614 13.5261 8 13.25 8H1.75C1.47386 8 1.25 7.77614 1.25 7.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </nav>
      <div v-if="!draggable.isMaximised" class="titleBar" ref="draggableRef">
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
  z-index: calc(v-bind(order) + 1);
}
.EDraggable.isDragging {
  z-index: 100;
}
.EDraggable.isVideo .titleBar {
  position: absolute;
  z-index: 1;
  width: 100%;
}
.EDraggable.isVideo .titleBar,
.EDraggable.isVideo .topBarNav {
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.EDraggable.isVideo:hover .titleBar,
.EDraggable.isVideo:hover .topBarNav {
  opacity: 1;
}
.EDraggable.isVideo article {
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

.topBarNav button {
  height: var(--h-6);
  width: var(--w-6);
  display: grid;
  place-content: center;
}
.topBarNav button:hover {
  background-color: var(--gray-300);
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
