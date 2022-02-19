<script setup lang="ts">
import { ref } from "vue";
import { useRange } from "../utils/date";

type Props = {
  nextEvent: any;
};

const { nextEvent } = defineProps<Props>();

const { formattedDistance, urgency } = useRange(
  new Date(nextEvent.start_at),
  new Date(nextEvent.end_at),
);
</script>

<template>
  <!-- <RouterLink
    v-if="nextEvent"
    class="ELiveButton"
    :class="{ isLive: urgency === 'now' }"
    to="/"
  >
    {{
      urgency === "now"
        ? `LIVE: ${nextEvent.title}`
        : `${formattedDistance}: ${nextEvent.title}`
    }}
  </RouterLink> -->
</template>

<style scoped>
/* @TODO: This is mostly repeating ENav code. Maybe do a more dry approach. */
.ELiveButton {
  display: inline-flex;
  height: var(--h-9);
  padding: var(--p-1) var(--p-3);
  border: var(--border-DEFAULT) solid var(--gray-500);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
}
.ELiveButton.isLive {
  color: var(--bg);
  background-color: var(--gray-200);
}
@media only screen and (max-width: 599px) {
  .ELiveButton {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
@media only screen and (min-width: 600px) {
  .ELiveButton {
    margin-left: auto;
    width: 20rem;
    padding: var(--p-1);
  }
}
@media only screen and (min-width: 1000px) {
  .ELiveButton {
    margin-left: calc(var(--border-DEFAULT) * -1);
  }
}
@media only screen and (min-width: 1240px) {
  .ELiveButton {
    width: 30rem;
  }
}
</style>
