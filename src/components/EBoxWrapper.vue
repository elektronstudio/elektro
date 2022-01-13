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
  <component :is="el" :class="color" class="EBoxWrapper">
    <slot />
  </component>
</template>

<style scoped>
.EBoxWrapper {
  padding: var(--p-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--rounded-3xl);
  aspect-ratio: v-bind(ratio);
}
.EBoxWrapper.accent {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.EBoxWrapper.gray {
  background-color: var(--gray-300);
  border-color: var(--gray-300);
  color: var(--bg);
}
</style>
