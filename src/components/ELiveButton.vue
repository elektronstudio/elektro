<script setup lang="ts">
import { ref } from "vue";

// @TODO: Compose this with real data
const isUpcoming = ref("LIVE: Taavet Jansen – Hundid");
const isLive = ref(true);
</script>

<template>
  <RouterLink class="ELiveButton" :class="{ isLive: isLive }" to="/">
    {{ isUpcoming }}
  </RouterLink>
</template>

<style scoped>
/* @TODO: This is mostly repeating ENav code. Maybe do a more dry approach. */
.ELiveButton {
  display: inline-flex;
  height: var(--h-9);
  padding: var(--p-1) var(--p-3);
  border: var(--border-DEFAULT) solid var(--gray-500);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
}
.ELiveButton.isLive {
  color: var(--bg);
  background-color: var(--gray-200);
}
@media only screen and (max-width: 599px) {
  .ELiveButton {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
@media only screen and (min-width: 600px) {
  .ELiveButton {
    margin-left: auto;
    min-width: 20rem;
    padding: var(--p-1);
  }
}
@media only screen and (min-width: 1000px) {
  .ELiveButton {
    min-width: 30rem;
  }
}
</style>
