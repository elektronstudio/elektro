<script setup lang="ts">
type Props = {
  layout?: "vertical" | "horizontal";
  cols?: number;
};

const { layout = "vertical", cols = 2 } = defineProps<Props>();
</script>

<template>
  <div class="EStack" :class="layout">
    <slot />
  </div>
</template>

<style>
.EStack {
  display: grid;
  gap: var(--gap-5); /* TODO: Gap as a prop? */
  width: 100%;
}
.EStack.vertical {
  grid-auto-rows: auto;
}
.EStack.horizontal {
  grid-auto-columns: auto;
  grid-template-columns: repeat(v-bind("cols"), 1fr);
}
@media (max-width: 800px) {
  .EStack.horizontal {
    grid-template-columns: 1fr;
  }
}
</style>
