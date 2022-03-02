<script setup lang="ts">
import EContent from "./EContent.vue";
import ETitle from "./ETitle.vue";

type Props = {
  title?: string;
  path: string;
  description?: string;
};

const { title, description } = defineProps<Props>();
</script>
<template>
  <section class="EscheduleEvent">
    <ETitle v-if="title" size="lg" :title="title" />
    <slot v-else name="title" />
    <EContent v-if="description" :content="description" />
    <slot />
  </section>
</template>

<style scoped>
.EscheduleEvent {
  display: flex;
  flex-direction: column;
}
.EscheduleEvent a:hover .ETitle {
  color: var(--fg);
}
.EscheduleEvent .ETitle,
.EscheduleEvent article {
  color: var(--gray-300);
  max-width: 60ch; /* TODO convert to var(--w-prose) */
  margin-bottom: var(--m-6);
}

.EscheduleEvent h3 {
  font-size: var(--text-3xl);
}
</style>
