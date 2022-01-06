<script setup lang="ts">
import { ENavButton } from "../lib";

// See peaks tulema propsina. Siis saab sama komponendiga ka jaluse teha näiteks.
const menuItems = [
  {
    name: "eˉlektron",
    path: "/",
  },
  {
    name: "Lavastused",
    path: "/lavastused",
  },
  {
    name: "Projektid",
    path: "/projektid",
  },
  {
    name: "Kava",
    path: "/kava",
  },
  {
    name: "Meist",
    path: "/meist",
  },
  {
    name: "ENG",
    path: "/en",
  },
  {
    name: "LIVE",
    path: "/live",
  },
];
</script>

<template>
  <nav class="MainNavigation">
    <ENavButton v-for="item in menuItems" :key="item.name" :to="item.path">
      {{ item.name }}
    </ENavButton>
  </nav>
</template>

<style scoped>
.MainNavigation {
  display: flex;
  height: var(--h-12);
  --menu-items-count: v-bind(menuItems.length);
}
.MainNavigation > *:first-child {
  width: calc(100% / var(--menu-items-count));
}
.MainNavigation > *:not(:first-child) {
  width: calc(100% / var(--menu-items-count) + var(--border-DEFAULT));
}
</style>
