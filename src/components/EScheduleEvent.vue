<script setup lang="ts">
import EContent from "./EContent.vue";
import EEventInstance from "./EEventInstance.vue";
import { EventInstance } from "../types";

type Props = {
  title: string;
  description?: string;
  events?: EventInstance[];
};

const { title, description, events } = defineProps<Props>();
</script>
<template>
  <article class="EscheduleEvent">
    <h3>{{ title }}</h3>
    <EContent v-if="description" :content="description" />
    <div v-if="events">
      <!-- Should we make this a separate component? -->
      <EEventInstance
        v-for="event in events"
        :start-time="event.startTime"
        :end-time="event.endTime"
        :ticket-url="event.ticketUrl"
      />
    </div>
  </article>
</template>

<style scoped>
.EscheduleEvent {
  display: flex;
  flex-direction: column;
  /* TODO: Remove this */
  max-width: 800px;
}
.EscheduleEvent h3,
.EscheduleEvent article {
  color: var(--gray-300);
  max-width: 60ch;
  margin-bottom: var(--p-3);
}

.EscheduleEvent h3 {
  font-size: var(--text-3xl);
}
</style>
