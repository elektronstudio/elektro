<script setup lang="ts">
type Props = {
  label?: string;
};

const { label } = defineProps<Props>();
</script>

<template>
  <label class="ELabel">
    <span>{{ label }}</span>
    <slot />
  </label>
</template>

<style scoped>
.ELabel span {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
  margin-bottom: var(--p-1);
  display: inline-block;
}
</style>
