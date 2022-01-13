<script setup lang="ts">
type Props = {
  el?: "div" | "article" | "section" | string;
};

const { el = "div" } = defineProps<Props>();
</script>

<template>
  <component :is="el" class="EBoxWrapper">
    <slot />
  </component>
</template>

<style scoped>
.EBoxWrapper {
  padding: var(--p-2);
  border: 1px solid var(--gray-300);
  border-radius: var(--rounded-DEFAULT);
}
</style>
