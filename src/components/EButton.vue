<script setup lang="ts">
type Props = {
  size?: "sm" | "md" | "lg";
  el?: "button" | "a";
};

const { size = "md", el = "button" } = defineProps<Props>();
</script>

<template>
  <component :is="el" :class="size">
    <slot />
  </component>
</template>

<style scoped>
.ButtonClassic {
  border: var(--border-2);
  border-color: var(--gray-500);
  background: none;
  color: var(--gray-500);
  font-weight: bold;
  cursor: pointer;
}
.ButtonClassic:hover {
  background: var(--gray-100);
}
.ButtonClassic.sm {
  font-size: var(--text-sm);
  padding: var(--p-2) var(--p-1);
}
.ButtonClassic.md {
  font-size: var(--text-md);
  padding: var(--p-3) var(--p-2);
}
.ButtonClassic.lg {
  font-size: var(--text-lg);
  padding: var(--p-4) var(--p-3);
}
</style>
