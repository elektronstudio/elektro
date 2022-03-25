<script setup lang="ts">
// TODO: Move to elektro
import { useVideostream } from "../utils";

type Props = {
  src: string;
};
const { src } = defineProps<Props>();
const { videoRef, width, height, status } = useVideostream(src);
</script>

<template>
  <div style="position: relative">
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
