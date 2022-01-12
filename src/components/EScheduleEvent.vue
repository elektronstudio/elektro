<script setup lang="ts">
import EButton from "./EButton.vue";

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
  <article>
    <h3>{{ title }}</h3>
    <div v-if="description" v-html="description" />
    <template v-if="events">
      <div>
        <div v-for="event in events">
          <time :datetime="event.startTime">{{ event.startTime }}</time>
          <EButton size="xs" el="a">+ Lisa kalendrisse</EButton>
          <EButton el="a" size="xs" color="accent">→ OSTA PILET</EButton>
        </div>
      </div>
    </template>
  </article>
</template>
