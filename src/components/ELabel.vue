<script setup lang="ts">
type Props = {
  label?: string;
  layout?: "horizontal" | "vertical";
};

const { label, layout = "vertical" } = defineProps<Props>();
</script>

<template>
  <label v-if="layout === 'vertical'" class="ELabel" :class="layout">
    <span>{{ label }}</span>
    <slot />
  </label>
  <label v-else class="ELabel" :class="layout">
    <slot />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
.ELabel span {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
  line-height: 1;
  display: inline-block;
}
.ELabel.vertical span {
  margin-bottom: var(--p-1);
}
.ELabel.horizontal span {
  margin-left: var(--p-1);
}
</style>
