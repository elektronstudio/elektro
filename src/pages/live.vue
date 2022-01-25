<script setup lang="ts">
import EBreadBoard from "../components/EBreadBoard.vue";
import ECard from "../components/ECard.vue";
import ETitle from "../components/ETitle.vue";
import EDraggable from "../components/EDraggable.vue";
</script>

<template>
  <EBreadBoard>
    <EDraggable>
      <div class="TestWindow"></div>
    </EDraggable>
  </EBreadBoard>
</template>

<style scoped>
.TestWindow {
  width: calc(4 * var(--breadboard-tile-size));
  height: 300px;
  background-color: var(--gray-300);
}
</style>
