<!-- @TODO: temporary component, remove this -->
<script setup lang="ts">
import { ENav } from "../lib";

const navItems = [
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
  <ENav :nav-items="navItems" :show-logo="true" />
</template>
