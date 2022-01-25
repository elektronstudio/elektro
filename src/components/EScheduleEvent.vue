<script setup lang="ts">
import EContent from "./EContent.vue";
import EEventInstance from "./EEventInstance.vue";

type Props = {
  title: string;
  description?: string;
  events?: {
    startTime: string;
    endTime: string;
    ticketUrl?: string;
  }[];
};

const { title, description, events } = defineProps<Props>();
</script>
<template>
  <section class="EscheduleEvent">
    <h3>{{ title }}</h3>
    <EContent v-if="description" :content="description" />
    <slot />
  </section>
</template>

<style scoped>
.EscheduleEvent {
  display: flex;
  flex-direction: column;
}
.EscheduleEvent h3,
.EscheduleEvent article {
  color: var(--gray-300);
  max-width: 60ch; /* TODO convert to var(--w-prose) */
  margin-bottom: var(--m-3);
}

.EscheduleEvent h3 {
  font-size: var(--text-3xl);
}
</style>
