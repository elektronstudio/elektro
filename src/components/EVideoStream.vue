<script setup lang="ts">
import { useVideostream } from "../utils";

type Props = {
  src: string;
};
const { src } = defineProps<Props>();
const { videoRef, width, height, status } = useVideostream(src);
</script>

<template>
  <div style="position: relative" class="EVideoStream">
    <video
      ref="videoRef"
      muted
      autoplay
      controls
      :width="width"
      :height="height"
      style="width: 100%"
    />
    <div
      style="
        position: absolute;
        top: var(--p-2);
        left: var(--p-2);
        font-family: var(--font-mono);
        font-size: var(--text-xs);
      "
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.EVideoStream {
  background-color: beige;
}
</style>
