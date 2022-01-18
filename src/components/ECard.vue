<script setup lang="ts">
type Props = {
  thumbnail?: string;
};

defineProps<Props>();
</script>
<template>
  <article class="ECard">
    <img v-if="thumbnail" class="thumbnail" :src="thumbnail" />
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </article>
</template>
<style scoped>
.ECard {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  padding: var(--p-7);
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--rounded-xl);
  overflow: hidden;
  background-color: white;
  /* @TODO: add small (or no hover device) screen variaton */
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
/* @TODO: naming convetion for component internal classes */
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

.ECard header,
.ECard footer {
  display: flex;
  opacity: var(--opacity-0);
  color: black;
  z-index: 1;
  /* @TODO: Add transitions vars */
  transition: opacity 0.2s ease-in-out;
}

.ECard header {
  flex-direction: column;
  margin-bottom: var(--m-4);
}
</style>
