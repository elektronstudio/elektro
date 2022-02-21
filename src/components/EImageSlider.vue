<script setup lang="ts">
import EImage from "./EImage.vue";

type Size = {
  url: string;
  width: number;
  height: number;
};

type Image = {
  sizes: Size[];
  alt?: string;
  caption?: string;
};

type Props = {
  images: Image[];
};

const { images } = defineProps<Props>();
</script>

<template>
  <section class="EImageSlider">
    <figure v-for="image in images">
      <EImage :sizes="image.sizes" :alt="image.alt" />
      <figcaption>
        <p>{{ image.caption }}</p>
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
.EImageSlider {
  display: flex;
  overflow-x: auto;
}

.EImageSlider figure {
  padding-left: var(--p-5);
  flex-shrink: 0;
}
.EImageSlider figure:last-child {
  padding-right: var(--p-5);
}

.EImageSlider figcaption {
  max-width: 16rem;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  line-height: var(--line-height-xs);
  color: var(--gray-300);
  margin-top: var(--m-4);
}

.EImageSlider .EImage {
  height: 70vw;
  width: auto;
  border-radius: var(--rounded-4xl);
}
@media only screen and (min-width: 600px) {
  .EImageSlider .EImage {
    height: 40vw;
  }
}
@media only screen and (min-width: 1000px) {
  .EImageSlider .EImage {
    height: 30vw;
  }
}
</style>
