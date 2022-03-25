<script setup lang="ts">
import { ContentType } from "../utils";
import EDraggableTitlebar from "./EDraggableTitlebar.vue";

type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
  order: number;
  contentType?: ContentType;
  data?: any;
};

const props = defineProps<Draggable>();

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();
</script>

<template>
  <Transition>
    <div class="EDraggableMobile" v-show="!props.isMinimised">
      <button
        @click.stop="emit('update-draggables', { ...props, isMinimised: true })"
      >
        ⅹ
      </button>
      <div ref="draggableRef">
        <EDraggableTitlebar :title="props.title" />
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
    width: 100%;
    height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size));
    top: 0;
    left: 50%;
    transform: translate(-50%);
  }
  75% {
    opacity: 1;
  }
  100% {
    width: 0;
    height: var(--h-6);
    top: calc(100vh - var(--h-6));
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
  }
}

.EDraggableMobile {
  position: relative;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: calc(v-bind(order) + 1);
}
.EDraggableMobile.v-enter-active {
  animation: windowAnimation 0.5s ease-in-out reverse;
}

.EDraggableMobile.v-leave-active {
  animation: windowAnimation 0.5s ease-in-out forwards;
}
.EDraggableMobile.v-enter-active *,
.EDraggableMobile.v-leave-active * {
  display: none;
}
.EDraggableMobile article {
  flex-grow: 1;
  height: calc(v-bind(tilesHeight) * var(--breadboard-tile-size) - var(--h-6));
  overflow-y: auto;
}

.EDraggableMobile button {
  z-index: 2;
  height: var(--h-6);
  width: var(--w-6);
  position: absolute;
  top: 0;
  right: 0;
}
.EDraggableMobile button:hover {
  background-color: var(--gray-300);
}
</style>
