<script setup lang="ts">
import EBreadBoard from "../components/EBreadBoard.vue";
import EDraggable from "../components/EDraggable.vue";
</script>

<template>
  <EBreadBoard>
    <EDraggable title="Draggable window" :tiles-width="4" :tiles-height="2" />
  </EBreadBoard>
</template>
