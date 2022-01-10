<script setup lang="ts">
import { ETitle, ENav } from "../lib";

const navItems = [
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
  <ENav :navItems="navItems" />
  <ETitle size="lg">Index page</ETitle>
</template>
