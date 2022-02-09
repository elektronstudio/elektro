<script setup lang="ts">
import { ETitle } from "../lib";
import ArtNav from "../components/ArtNav.vue";
</script>

<template>
  <ArtNav />
  <div class="Index">
    <ETitle size="lg">Index page</ETitle>
  </div>
</template>

<style>
.Index {
  padding: var(--p-5);
}
</style>
