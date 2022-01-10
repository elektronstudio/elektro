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
    <ENavButton v-for="item in navItems" :key="item.name" :to="item.path">
      {{ item.name }}
    </ENavButton>
  </nav>
</template>

<style scoped>
.ENav {
  display: grid;
  height: var(--h-12);
  --menu-items-count: v-bind(navItems ? navItems.length: 0);
  grid-template-columns: repeat(var(--menu-items-count), 1fr);
}
</style>
