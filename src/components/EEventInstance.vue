<script setup lang="ts">
import EButton from "./EButton.vue";
// import { EventInstance } from "../types";

/* TODO: Why does imported type not work here? */
// type Props = EventInstance & {
//   layout?: "vertical" | "horizontal";
// };
type Props = {
  startTime: string;
  endTime: string;
  ticketUrl?: string;
  layout?: "vertical" | "horizontal";
};

const { startTime, ticketUrl, layout = "horizontal" } = defineProps<Props>();
</script>

<template>
  <div class="EEventInstance" :class="layout">
    <time :datetime="startTime">{{ startTime }}</time>
    <section>
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
    </section>
  </div>
</template>

<style scoped>
.EEventInstance {
  display: flex;
  padding: var(--p-3) 0;
}
.EEventInstance.horizontal {
  justify-content: space-between;
}
.EEventInstance.vertical {
  flex-direction: column;
  gap: var(--gap-3);
}
.EEventInstance.vertical section > *:first-child {
  order: 2;
}
.EEventInstance section {
  display: flex;
  gap: var(--gap-3);
}
.EEventInstance:not(:last-child) {
  border-bottom: 1px solid var(--gray-300);
}
</style>
