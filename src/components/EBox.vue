<!-- @TODO: better component naming -->
<script setup lang="ts">
type Props = {
  el?: "div" | "article" | "section" | "aside" | string;
  ratio?:
    | "16 / 9"
    | "4 / 3"
    | "1 / 1"
    | "3 / 4"
    | "9 / 16"
    | "1 / 2"
    | "2 / 1"
    | "auto";
  layout?: "columns1" | "columns2" | "columns3" | "columns4";
  // @TODO: Rethink how to pass colors to components
  color?: "accent" | "gray";
};

const { el = "div", color, ratio = "auto", layout } = defineProps<Props>();
</script>

<template>
  <component :is="el" :class="[color, layout]" class="EBox">
    <slot />
  </component>
</template>

<style scoped>
.EBox {
  padding: var(--p-4);
  border: 1px solid var(--gray-500);
  border-radius: var(--rounded-3xl);
  aspect-ratio: v-bind(ratio);
  color: var(--gray-300);
}
.EBox.accent {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.EBox.accent :deep(*)::selection {
  color: var(--bg);
  text-shadow: 2px 1px 5px var(--bg);
}

.EBox.gray {
  background-color: var(--gray-300);
  border-color: var(--gray-500);
  color: var(--bg);
}

/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .EBox.columns3,
  .EBox.columns4 {
    grid-column: span 2;
  }
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 1240px) {
  .EBox.columns2 {
    grid-column: span 2;
  }
  .EBox.columns3 {
    display: grid;
    grid-template-columns: 2fr 4fr;
    grid-gap: var(--gap-5);
    grid-column: span 3;
  }
  .EBox.columns4 {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: var(--gap-5);
    grid-column: span 4;
  }
}
</style>
