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
};

type Props = {
  thumbnail?: Image;
};

const { thumbnail } = defineProps<Props>();
</script>
<template>
  <article class="ECard">
    <EImage
      v-if="thumbnail"
      :alt="thumbnail?.alt"
      :sizes="thumbnail.sizes"
      class="thumbnail"
    />
    <section class="content">
      <header v-if="$slots.header">
        <slot name="header" />
      </header>
      <footer v-if="$slots.footer">
        <slot name="footer" />
      </footer>
    </section>
  </article>
</template>
<style scoped>
.ECard header {
  flex-direction: column;
  margin-bottom: var(--m-4);
}

/* @TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .ECard {
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-areas: "thumbnail content";
    align-content: start;
    column-gap: var(--gap-5);
    margin-bottom: var(--m-6);
  }
  .thumbnail {
    grid-area: thumbnail;
  }
  .content {
    grid-area: content;
    color: var(--gray-300);
  }
  .content :deep(.ETitle) {
    color: var(--fg);
  }
  .thumbnail {
    border-radius: var(--rounded-xl);
    aspect-ratio: 1;
    object-fit: cover;
  }
}
@media only screen and (min-width: 600px) {
  .ECard {
    display: flex;
    position: relative;
    aspect-ratio: 1;
    padding: var(--p-7);
    border-radius: var(--rounded-xl);
    overflow: hidden;
    background-color: white;
  }
  .thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    /* @TODO: Add transitions vars */
    transition: opacity 0.2s ease-in-out;
  }
  .ECard .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
  }
  .ECard header,
  .ECard footer {
    display: flex;
    opacity: var(--opacity-0);
    color: black;
    z-index: 1;
    /* @TODO: Add transitions vars */
    transition: opacity 0.2s ease-in-out;
  }
  .ECard:hover header,
  .ECard:hover footer {
    opacity: var(--opacity-100);
  }
  .ECard:hover .thumbnail {
    mix-blend-mode: difference;
    filter: blur(10px);
    opacity: var(--opacity-60);
  }
}
</style>
