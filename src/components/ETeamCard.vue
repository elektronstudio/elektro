<!-- @TODO: Should this be added to components page -->
<script setup lang="ts">
import ECard from "./ECard.vue";
import EContent from "./EContent.vue";
import ETitle from "./ETitle.vue";
type Props = {
  name?: string;
  thumbnail?: string;
  content?: string;
};
const { name, thumbnail, content } = defineProps<Props>();
</script>

<template>
  <ECard :thumbnail="thumbnail">
    <template #header>
      <ETitle v-if="name" el="h3" size="lg" :title="name" />
    </template>
    <template #footer>
      <EContent>
        {{ content }}
      </EContent>
    </template>
  </ECard>
</template>
