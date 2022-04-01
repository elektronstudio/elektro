<!-- @TODO consider renaming -->
<script setup lang="ts">
import EButton from "./EButton.vue";
import IconArrowRight from "~icons/radix-icons/arrow-right";

type Props = {
  title?: string;
  startAt: string;
  ticketUrl?: string;
  layout?: "vertical" | "horizontal";
};

const { startAt, ticketUrl, layout = "horizontal" } = defineProps<Props>();
</script>

<template>
  <div class="EEventInstance" :class="layout">
    <header>
      <time :datetime="startAt">{{ startAt }}</time>
      <slot name="title" />
    </header>
    <section>
      <!-- @TODO: Add system for calendar buttons -->
      <!-- <EButton size="xs" el="a" color="transparent">+ Lisa kalendrisse</EButton> -->
      <!-- @TODO: Add system or component for arrows -->
      <slot name="buttons" />
      <EButton
        el="a"
        size="xs"
        color="accent"
        target="_blank"
        :href="ticketUrl"
      >
        <IconArrowRight />
        OSTA PILET
      </EButton>
    </section>
  </div>
</template>

<style scoped>
.EEventInstance {
  display: flex;
  padding: var(--p-3) 0;
  border-top: 1px solid var(--gray-500);
  flex-direction: column;
  align-items: flex-start;
}
.EEventInstance header {
  display: flex;
  flex-direction: column;
}
.EEventInstance.vertical {
  gap: var(--gap-3);
}
.EEventInstance.vertical section > *:first-child {
  order: 2;
}
.EEventInstance section {
  display: flex;
  gap: var(--gap-3);
  flex-shrink: 0;
}
.EEventInstance time {
  color: var(--fg);
}
/* @TODO: Add breakpoints system */
@media only screen and (max-width: 599px) {
  .EEventInstance section {
    margin-top: var(--m-3);
  }
}

@media only screen and (min-width: 600px) {
  .EEventInstance.horizontal {
    flex-direction: row;
    justify-content: space-between;
  }

  .EEventInstance section {
    flex-direction: row;
    align-items: flex-start;
  }
}
</style>
