<!-- @TODO: Should this be added to components page -->
<script setup lang="ts">
import ECard from "./ECard.vue";
import ETitle from "./ETitle.vue";
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
  <ECard :thumbnail="thumbnail">
    <template #header>
      <ETitle el="h3" size="lg">{{ title }}</ETitle>
      <h6 v-if="author">{{ author }}</h6>
    </template>
    <template #footer>
      <p v-if="events">Järgmine etendus:</p>
      <!-- @TODO: Format time -->
      <time v-if="events" :datetime="events[0].startTime">{{
        events[0].startTime
      }}</time>
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
  /* @TODO: Replace with tw margin variable */
  margin-bottom: var(--p-2);
}
.ECard footer {
  justify-content: space-between;
}
</style>
