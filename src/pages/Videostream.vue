<script setup lang="ts">
import { useVideostream } from "../utils/videostream";
import ETitle from "../components/ETitle.vue";
const url =
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
const { videoRef, status, width, height } = useVideostream(url);
</script>

<template>
  <div class="Videostream">
    <ETitle>Videostream</ETitle>
    <video
      muted
      autoplay
      controls
      ref="videoRef"
      :width="width"
      :height="height"
    />
    <p>Status: {{ status }}</p>
  </div>
</template>

<style scoped>
.Videostream {
  display: grid;
  gap: var(--gap-4);
  padding: var(--p-4);
}
</style>
