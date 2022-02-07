<script setup lang="ts">
import { useVideostream } from "../utils/videostream";
import ETitle from "../components/ETitle.vue";
import EFormText from "../components/EFormText.vue";
import { ref } from "vue";

const defaultUrl = "https://cloudflare.tv/hls/live.m3u8";
const url = ref(defaultUrl);
const { videoRef, status, width, height } = useVideostream(url);
</script>

<template>
  <div class="Videostream">
    <ETitle>Videostream</ETitle>
    <EFormText v-model="url" label="HLS URL" />
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
