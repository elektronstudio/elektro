<script setup lang="ts">
type Props = {
  title?: string;
  userCount?: number;
  isMinimised?: boolean;
};

const { title } = defineProps<Props>();
</script>

<template>
  <div class="EDraggableTitlebar">
    <h6 v-if="title">{{ title }}</h6>
    <span v-if="userCount && isMinimised" class="userCount">{{
      userCount
    }}</span>
  </div>
</template>

<style scoped>
.EDraggableTitlebar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg);
  height: var(--h-6);
  overflow: hidden;
}
.EDraggableTitlebar h6 {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  padding-left: var(--p-2);
  padding-right: var(--p-6);
}
.EDraggableTitlebar h6,
.userCount {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
}

.EDraggableTitlebar:hover {
  background-color: var(--gray-600);
}

.userCount {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  aspect-ratio: 1;
  display: grid;
  place-content: center;
  background-color: var(--accent);
  color: var(--bg);
}
</style>
