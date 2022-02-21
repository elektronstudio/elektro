<script setup lang="ts">
import EDraggableTitlebar from "./EDraggableTitlebar.vue";

type ContentType = "chat" | "text" | "image" | "video";

type Draggable = {
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

type Props = {
  draggables: Draggable[];
};

const { draggables } = defineProps<Props>();

const emit = defineEmits<{
  (e: "update-draggables", draggable: Draggable): void;
}>();
</script>

<template>
  <TransitionGroup class="EDraggablesDock" name="dock" tag="nav">
    <EDraggableTitlebar
      v-for="draggable in draggables"
      :title="draggable.title"
      @click.="emit('update-draggables', { ...draggable, isMinimised: false })"
      :data-id="draggable.draggableId"
      :key="draggable.draggableId"
    />
  </TransitionGroup>
</template>

<style scoped>
.EDraggablesDock {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  align-items: flex-end;
}

.EDraggablesDock > * {
  flex: 0 0 50%;
}

.dock-enter-active,
.dock-leave-active {
  transition: width 0.2s ease-in-out;
}

.dock-enter-active {
  transition-delay: 0.2s;
}
.dock-enter-from,
.dock-leave-to {
  width: 0;
}

/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .EDraggablesDock {
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
  }

  .EDraggablesDock > * {
    display: inline-block;
    margin-right: var(--m-3);
    width: 6rem;
  }
}
@media only screen and (min-width: 1000px) {
  .EDraggablesDock {
    padding-left: var(--breadboard-tile-size);
  }
  .EDraggablesDock > * {
    width: 10rem;
  }
}
</style>
