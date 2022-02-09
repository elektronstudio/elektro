<script setup lang="ts">
import { computed, ref } from "vue";
import { useElementSize } from "@vueuse/core";
import { nearest } from "../utils/array";

const { images, alt = "" } = defineProps<Props>();

type Image = {
  url: string;
  width: number;
  height: number;
};

type Props = {
  images: Image[];
  alt?: string;
};

const el = ref(null);
const { width } = useElementSize(el);

const image = computed(() => {
  const nearestWidth = nearest(
    images.map(({ width }) => width),
    width.value,
  );
  return images.filter((image) => image.width === nearestWidth)?.[0];
});
</script>

<template>
  <img
    ref="el"
    :src="image.url"
    :width="image.width"
    :height="image.height"
    :alt="alt"
    loading="lazy"
    decoding="async"
    class="Image"
  />
</template>

<style scoped>
.Image {
  display: block;
  width: 100%;
}
</style>
