<script setup lang="ts">
type Props = {
  size?: "sm" | "md" | "lg";
  el?: "button" | "a";
};

const { size = "md", el = "button" } = defineProps<Props>();
</script>

<template>
  <component :is="el" class="EButton" :class="size">
    <slot />
  </component>
</template>

<style scoped>
.EButton {
  background: none;
  color: var(--gray-500);
  border: 2px solid var(--gray-500);
  font-weight: bold;
  cursor: pointer;
}
.EButton:hover {
  background: var(--gray-100);
}
.EButton.sm {
  font-size: var(--text-sm);
  padding: var(--p-2) var(--p-4);
}
.EButton.md {
  font-size: var(--text-md);
  padding: var(--p-3) var(--p-5);
}
.EButton.lg {
  font-size: 1.125rem/1.75rem;
  padding: var(--p-4) var(--p-6);
}
</style>
