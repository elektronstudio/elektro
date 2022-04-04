<script setup lang="ts">
import { Draggable } from "../utils";
import EDraggableTitlebar from "./EDraggableTitlebar.vue";

type Props = {
  draggables: Draggable[];
  draggableMaximised: boolean;
  idle?: boolean;
};

const { draggables, draggableMaximised, idle } = defineProps<Props>();

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();
</script>

<template>
  <TransitionGroup
    class="EDraggablesDock"
    :class="{ draggableMaximised: draggableMaximised, idle: idle }"
    name="dock"
    tag="nav"
  >
    <EDraggableTitlebar
      v-for="draggable in draggables"
      :title="draggable.title"
      @click="emit('update-draggables', { ...draggable, isMinimised: false })"
      :data-id="draggable.draggableId"
      :key="draggable.draggableId"
      :user-count="draggable.userCount"
      :is-minimised="draggable.isMinimised"
    />
  </TransitionGroup>
</template>

<style scoped>
.EDraggablesDock {
  display: flex;
  flex-flow: wrap;
  flex-direction: column-reverse;
  width: 100%;
  z-index: 1000;
}
.EDraggablesDock > .EDraggableTitlebar[data-id="chat"] {
  order: -1;
}
.EDraggablesDock.draggableMaximised {
  transform: translateY(0%);
  transition: transform 0.3s ease-in-out;
}
.EDraggablesDock.idle {
  transform: translateY(100%);
}
/* @TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EDraggablesDock > * {
    width: 100%;
    padding: 4px 0;
    /* @TODO: add two column layout */
    /* flex: 0 0 100%; */
    /* flex: 0 0 50%; */
    /* border: 1px solid var(--gray-500); */
  }
}
@media only screen and (max-width: 899px) {
  .EDraggableTitlebar {
    border-top: 1px solid var(--gray-500);
  }
}
@media only screen and (min-width: 900px) {
  .EDraggablesDock {
    flex-flow: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-left: var(--breadboard-tile-size);
    padding-right: var(--gap-3);
  }
  .EDraggablesDock > .EDraggableTitlebar[data-id="chat"] {
    position: fixed;
    right: var(--gap-3);
    bottom: 0;
  }

  .EDraggablesDock > * {
    display: inline-block;
    margin-right: var(--m-3);
    width: var(--dock-item-size);
    flex-shrink: 0;
    border: 1px solid var(--gray-500);
    border-bottom: 0;
  }
}
.dock-enter-active,
.dock-leave-active {
  transform: scale(1);
  transition: 0.2s ease-in-out;
}

.dock-enter-from,
.dock-leave-to {
  transform: scale(0);
}

.dock-enter-active {
  transition-delay: 0.2s;
}

@media only screen and (min-width: 1000px) {
  .dock-enter-from,
  .dock-leave-to {
    width: 0;
    translate: scale(1);
  }
  .EDraggablesDock {
    padding-left: var(--breadboard-tile-size);
  }
}
</style>
