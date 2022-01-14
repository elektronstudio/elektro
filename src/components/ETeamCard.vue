<script setup lang="ts">
import ECard from "./ECard.vue";
import EContent from "./EContent.vue";
import ETitle from "./ETitle.vue";
type Props = {
  name: string;
  thumbnail?: string;
  content?: string;
};
const { name, thumbnail, content } = defineProps<Props>();
</script>

<template>
  <ECard :thumbnail="thumbnail">
    <template #header>
      <ETitle el="h3" size="lg">{{ name }}</ETitle>
    </template>
    <template #footer>
      <EContent>
        <p>{{ content }}</p>
      </EContent>
    </template>
  </ECard>
</template>
<style scoped>
.ECard {
  grid-column: span 2;
}
</style>
