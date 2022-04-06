<script setup lang="ts">
type Props = {
  newMessages?: number;
};

const { newMessages } = defineProps<Props>();
</script>

<template>
  <span v-if="newMessages" class="EChatBadge">{{ newMessages }}</span>
</template>

<style scoped>
.EChatBadge {
  aspect-ratio: 1;
  display: grid;
  place-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--accent);
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
}
</style>
