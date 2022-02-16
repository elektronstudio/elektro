<script setup lang="ts">
import { ETitle } from "../lib";
import ArtNav from "../components/ArtNav.vue";
</script>

<template>
  <ArtNav />
  <video
    controls
    src="https://pepe-dl.babahhcdn.com/bb1150/video/2021_11/2021_11_27_x_live_1_c1_5/640x360_318_1638020921.mp4"
  />
  <div class="Index">
    <ETitle size="lg">Index page</ETitle>
  </div>
</template>

<style>
.Index {
  padding: var(--p-5);
}
</style>
