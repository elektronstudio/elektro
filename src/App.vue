<script setup lang="ts">
import Debug from "./components/Debug.vue";
import EWindowBorder from "./components/EWindowBorder.vue";
</script>

<template>
  <EWindowBorder />
  <router-view />
  <Debug />
</template>
