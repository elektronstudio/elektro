<!-- @TODO consider renaming -->
<script setup lang="ts">
import EButton from "./EButton.vue";

type Props = {
  start_at: string;
  end_at: string;
  ticketUrl?: string;
  layout?: "vertical" | "horizontal";
};

const { start_at, ticketUrl, layout = "horizontal" } = defineProps<Props>();
</script>

<template>
  <div class="EEventInstance" :class="layout">
    <time :datetime="start_at">{{ start_at }}</time>
    <section>
      <EButton size="xs" el="a" color="transparent">+ Lisa kalendrisse</EButton>
      <!-- @TODO: Add system or component for arrows -->
      <EButton
        el="a"
        size="xs"
        color="accent"
        target="_blank"
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
  border-top: 1px solid var(--gray-500);
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
.EEventInstance time {
  color: var(--fg);
}
</style>
