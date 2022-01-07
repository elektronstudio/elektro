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
  <nav class="ENav">
    <ENavButton v-for="item in menuItems" :key="item.name" :to="item.path">
      {{ item.name }}
    </ENavButton>
  </nav>
</template>

<style scoped>
.ENav {
  display: grid;
  height: var(--h-12);
  --menu-items-count: v-bind(menuItems.length);
  grid-template-columns: repeat(var(--menu-items-count), 1fr);
}
</style>
