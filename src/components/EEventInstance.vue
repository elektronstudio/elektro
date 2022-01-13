<script setup lang="ts">
import EButton from "./EButton.vue";

// import { EventInstance } from "../types";
/* TODO: Why does imported type not work here? */
type EventInstance = {
  startTime: string;
  endTime: string;
  ticketUrl?: string;
};

const { startTime, ticketUrl } = defineProps<EventInstance>();
</script>

<template>
  <div className="EEventInstance">
    <time :datetime="startTime">{{ startTime }}</time>
    <EButton size="xs" el="a" color="transparent">+ Lisa kalendrisse</EButton>
    <EButton
      el="a"
      size="xs"
      color="accent"
      target="_blank2 "
      :href="ticketUrl"
    >
      → OSTA PILET
    </EButton>
  </div>
</template>

<style scoped>
.EEventInstance {
  display: flex;
  justify-content: space-between;
  padding: var(--p-3) 0;
}
.EEventInstance:not(:last-child) {
  border-bottom: 1px solid var(--gray-300);
}
.EEventInstance > article,
.EEventInstance > *:last-child {
  margin-left: var(--p-3);
}
.EEventInstance time {
  margin-right: auto;
}
</style>
