<script setup lang="ts">
import ELogo from "./ELogo.vue";

type Props = {
  navItems: {
    name: string;
    path: string;
  }[];
  showLogo?: boolean;
};

const { navItems, showLogo } = defineProps<Props>();
const menuItemsLength =
  navItems && showLogo ? navItems.length + 1 : navItems ? navItems.length : 0;
</script>

<template>
  <nav class="ENav">
    <RouterLink v-if="showLogo" to="/">
      <ELogo el="span" />
    </RouterLink>
    <RouterLink v-for="item in navItems" :key="item.name" :to="item.path">
      {{ item.name }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.ENav {
  display: grid;
  height: var(--h-9);
  --menu-items-count: v-bind(menuItemsLength);
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
