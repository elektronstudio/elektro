<script setup lang="ts">
import EButton from "./EButton.vue";
import EContent from "./EContent.vue";

type Props = {
  title: string;
  description?: string;
  events?: {
    startTime: string;
    endTime: string;
  }[];
};

const { title, description, events } = defineProps<Props>();
</script>
<template>
  <article class="EscheduleEvent">
    <h3>{{ title }}</h3>
    <EContent v-if="description" :content="description" />
    <div v-if="events">
      <!-- Should we make this a separate component? -->
      <div v-for="event in events" className="instance">
        <time :datetime="event.startTime">{{ event.startTime }}</time>
        <EButton size="xs" el="a" color="transparent"
          >+ Lisa kalendrisse</EButton
        >
        <EButton el="a" size="xs" color="accent">→ OSTA PILET</EButton>
      </div>
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
.instance {
  display: flex;
  justify-content: space-between;
  padding: var(--p-3) 0;
}
.instance:not(:last-child) {
  border-bottom: 1px solid var(--gray-300);
}
.instance > article,
.instance > *:last-child {
  margin-left: var(--p-3);
}
.instance time {
  margin-right: auto;
}
</style>
