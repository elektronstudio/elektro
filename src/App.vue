<script setup lang="ts">
// EDebug is an internal component and not exported in "./lib"
import EDebug from "./components/EDebug.vue";
</script>

<template>
  <router-view />
  <EDebug />
</template>
