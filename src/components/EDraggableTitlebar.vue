<script setup lang="ts">
type Props = {
  title?: string;
};

const { title } = defineProps<Props>();
</script>

<template>
  <nav class="EDraggableTitlebar">
    <h6 v-if="title">{{ title }}</h6>
  </nav>
</template>

<style scoped>
.EDraggableTitlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: var(--h-6);
  padding: var(--p-2);
  padding-right: var(--p-6);
}
.EDraggableTitlebar h6 {
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.EDraggableTitlebar:hover {
  background-color: var(--gray-600);
}
</style>
