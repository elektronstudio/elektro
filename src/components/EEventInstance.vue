<!-- @TODO consider renaming -->
<script setup lang="ts">
import EButton from "./EButton.vue";

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
      <slot name="title" />
      <time :datetime="startAt">{{ startAt }}</time>
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
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
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
.EEventInstance.horizontal header {
  flex-direction: column-reverse;
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
