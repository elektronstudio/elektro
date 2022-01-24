<script setup lang="ts">
type Props = {
  fieldId?: string;
  layout?: "horizontal" | "vertical";
  disabled?: boolean;
};

const { fieldId, layout = "vertical", disabled = false } = defineProps<Props>();
</script>

<template>
  <label
    class="ELabel"
    :for="fieldId"
    :class="[layout, disabled ? 'disabled' : '']"
  >
    <slot />
  </label>
</template>

<style scoped>
.ELabel {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
  line-height: 1;
  display: inline-block;
}
.ELabel.vertical {
  margin-bottom: var(--p-1);
}
.ELabel.horizontal {
  margin-left: var(--p-1);
}
.ELabel.disabled {
  color: var(--gray-500);
  cursor: not-allowed;
}
</style>
