<script setup lang="ts">
import EContent from "./EContent.vue";
import ETitle from "./ETitle.vue";

type Props = {
  title: string;
  description?: string;
};

const { title, description } = defineProps<Props>();
</script>
<template>
  <section class="EscheduleEvent">
    <ETitle size="lg" :title="title" />
    <EContent v-if="description" :content="description" />
    <slot />
  </section>
</template>

<style scoped>
.EscheduleEvent {
  display: flex;
  flex-direction: column;
}
.EscheduleEvent .ETitle,
.EscheduleEvent article {
  color: var(--gray-300);
  max-width: 60ch; /* TODO convert to var(--w-prose) */
  margin-bottom: var(--m-3);
}

.EscheduleEvent h3 {
  font-size: var(--text-3xl);
}
</style>
