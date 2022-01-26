<script setup lang="ts">
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
import randomString from "../utils/randomString";

const modules = [
  {
    title: "Module 1",
    id: "draggable-module-1",
    initialSnappedX: 4,
    initialSnappedY: 2,
    tilesWidth: 4,
    tilesHeight: 4,
  },
  {
    title: "Module 2",
    id: "draggable-module-2",
    initialSnappedX: 8,
    initialSnappedY: 6,
    tilesWidth: 6,
    tilesHeight: 2,
  },
];
</script>

<template>
  <EBreadBoard>
    <EDraggable
      v-for="module in modules"
      :title="module.title"
      :module-id="module.id"
      :tiles-width="module.tilesWidth"
      :tiles-height="module.tilesHeight"
      :initial-snapped-x="module.initialSnappedX"
      :initial-snapped-y="module.initialSnappedY"
    />
  </EBreadBoard>
</template>
