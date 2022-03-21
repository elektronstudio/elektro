<!-- @TODO: Should this be added to components page -->
<script setup lang="ts">
import ECard from "./ECard.vue";
import ETitle from "./ETitle.vue";

type Size = {
  url: string;
  width: number;
  height: number;
};

type Props = {
  title: string;
  author?: string;
  thumbnail?: {
    sizes: Size[];
    alt?: string;
  };
  nextEvent?: {
    startAt: string;
    ticketUrl?: string;
  };
};

const { title, author, thumbnail, nextEvent } = defineProps<Props>();
</script>
<template>
  <ECard :thumbnail="thumbnail">
    <template #header>
      <ETitle el="h3" size="lg" v-html="title" />
      <h6 v-if="author" v-html="author" />
    </template>
    <template #footer>
      <p v-if="nextEvent">Järgmine etendus:</p>
      <!-- @TODO: Format time -->
      <time v-if="nextEvent" :datetime="nextEvent.startAt">
        {{ nextEvent.startAt }}
      </time>
    </template>
  </ECard>
</template>
<style scoped>
.ECard footer,
.ECard header h6 {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  text-transform: uppercase;
}
.ECard header h3 {
  margin-bottom: var(--m-2);
}
.ECard footer {
  justify-content: space-between;
}
.ECard footer p {
  margin-right: 0.6em;
}
</style>
