<script setup lang="ts">
import { computed, ref } from "vue";
import { useElementSize } from "@vueuse/core";
import { nearest } from "../utils/array";

const { sizes, alt = "" } = defineProps<Props>();

type Size = {
  url: string;
  width: number;
  height: number;
};

type Props = {
  sizes: Size[];
  alt?: string;
};

const el = ref(null);
const { width } = useElementSize(el);

const image = computed(() => {
  const nearestWidth = nearest(
    sizes.map(({ width }) => width),
    width.value,
  );
  return sizes.filter((image) => image.width === nearestWidth)?.[0];
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
    class="EImage"
  />
</template>

<style scoped>
.EImage {
  display: block;
  width: 100%;
}
</style>
