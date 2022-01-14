<script setup lang="ts">
type Props = {
  title: string;
  author?: string;
  thumbnail?: string;
  events?: {
    startTime: string;
    endTime: string;
    ticketUrl?: string;
  }[];
};

defineProps<Props>();
</script>
<template>
  <article class="EProjectCard">
    <img v-if="thumbnail" class="thumbnail" :src="thumbnail" />
    <header>
      <h3>{{ title }}</h3>
      <h6 v-if="author">{{ author }}</h6>
    </header>
    <footer v-if="events">
      <p>Järgmine etendus:</p>
      <!-- @TODO: Format time -->
      <time :datetime="events[0].startTime">{{ events[0].startTime }}</time>
    </footer>
  </article>
</template>
<style scoped>
.EProjectCard {
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
.EProjectCard:hover header,
.EProjectCard:hover footer {
  opacity: var(--opacity-100);
}
.EProjectCard:hover .thumbnail {
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
}

.EProjectCard header,
.EProjectCard footer {
  display: flex;
  opacity: var(--opacity-0);
  color: black;
  z-index: 1;
  transition: opacity 0.2s ease-in-out;
}

.EProjectCard footer,
.EProjectCard header h6 {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.EProjectCard header {
  flex-direction: column;
  margin-bottom: var(--p-4);
}
.EProjectCard header h3 {
  font-size: var(--text-3xl);
  line-height: var(--line-height-5xl);
  /* @TODO: Replace with tw margin variable */
  margin-bottom: var(--p-2);
}
.EProjectCard footer {
  justify-content: space-between;
}
</style>
