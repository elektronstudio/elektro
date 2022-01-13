<!-- @TODO: better component naming -->
<script setup lang="ts">
type Props = {
  el?: "div" | "article" | "section" | string;
  ratio?:
    | "16 / 9"
    | "4 / 3"
    | "1 / 1"
    | "3 / 4"
    | "9 / 16"
    | "1 / 2"
    | "2 / 1"
    | "auto";
  color?: "accent" | "gray";
};

const { el = "div", color, ratio = "auto" } = defineProps<Props>();
</script>

<template>
  <component :is="el" :class="color" class="EBox">
    <slot />
  </component>
</template>

<style scoped>
.EBox {
  padding: var(--p-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--rounded-3xl);
  aspect-ratio: v-bind(ratio);
}
.EBox.accent {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.EBox.gray {
  background-color: var(--gray-300);
  border-color: var(--gray-300);
  color: var(--bg);
}
</style>
