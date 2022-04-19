<script setup lang="ts">
type Props = {
  size?: "xs" | "sm" | "md" | "lg";
  el?: "button" | "a";
  color?: "accent" | "gray" | "transparent";
};

const { size = "md", el = "button" } = defineProps<Props>();
</script>

<template>
  <component :is="el" class="EButton" :class="`${size} ${color}`">
    <slot />
  </component>
</template>

<style scoped>
.EButton {
  background: none;
  display: inline-flex;
  color: var(--gray-300);
  border: 1px solid var(--gray-300);
  cursor: pointer;
  font-family: var(--font-mono);
  text-transform: uppercase;
  border-radius: var(--rounded-DEFAULT);
  line-height: var(--line-height-5xl);
}
.EButton:hover {
  filter: brightness(0.8);
}
.EButton.xs {
  font-size: var(--text-xs);
  padding: var(--p-1);
}

.EButton :deep(svg) {
  margin-right: var(--m-1);
  width: 1em;
  height: 1em;
}
.EButton.sm {
  font-size: var(--text-sm);
  padding: var(--p-2);
}
.EButton.md {
  font-size: var(--text-md);
  padding: var(--p-2);
}
.EButton.lg {
  font-size: var(--text-lg);
  padding: var(--p-2) var(--p-3);
}
.EButton.accent {
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--bg);
}
.EButton.gray {
  background-color: var(--gray-300);
  border-color: var(--gray-300);
  color: var(--bg);
}
.EButton.transparent {
  background-color: transparent;
  border-color: transparent;
  color: var(--gray-300);
}
</style>
