<script setup lang="ts">
type Props = {
  label?: string;
  disabled?: boolean;
  layout?: "horizontal" | "vertical";
};

const { label, layout = "vertical", disabled = false } = defineProps<Props>();
</script>

<template>
  <label
    v-if="layout === 'vertical'"
    class="ELabel"
    :class="[layout, disabled ? 'disabled' : '']"
  >
    <span>{{ label }}</span>
    <slot />
  </label>
  <label v-else class="ELabel" :class="[layout, disabled ? 'disabled' : '']">
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
.ELabel.disabled span {
  color: var(--gray-500);
  cursor: not-allowed;
}
</style>
