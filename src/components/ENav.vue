<script setup lang="ts">
import { ENavButton } from "../lib";

type Props = {
  navItems: {
    name: string;
    path: string;
  }[];
};

defineProps<Props>();
</script>

<template>
  <nav class="ENav">
    <RouterLink v-for="item in navItems" :key="item.name" :to="item.path">
      {{ item.name }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.ENav {
  display: grid;
  height: var(--h-12);
  --menu-items-count: v-bind(navItems ? navItems.length: 0);
  grid-template-columns: repeat(var(--menu-items-count), 1fr);
}
.ENav > :deep(*) {
  display: inline-flex;
  padding: var(--p-1);
  border: var(--border-DEFAULT) solid var(--gray-500);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
}
.ENav > :deep(*):not(:first-child) {
  margin-left: calc(var(--border-DEFAULT) * -1);
}
.ENav > :deep(*):hover {
  border-image: url("/images/bg-texture-xs.gif") 1;
  z-index: 2;
}
</style>
