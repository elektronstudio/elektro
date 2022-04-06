<script setup lang="ts">
type Props = {
  title?: string;
  isMinimised?: boolean;
};

const { title, isMinimised } = defineProps<Props>();
</script>

<template>
  <div class="EDraggableTitlebar" :class="{ isMinimised: isMinimised }">
    <h6 v-if="title">{{ title }}</h6>
    <nav class="badgeSlot">
      <slot />
    </nav>
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
.EDraggableTitlebar h6 {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
}

.EDraggableTitlebar:hover {
  background-color: var(--gray-600);
}

.badgeSlot {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>
