<script setup lang="ts">
import { useCssVar, useWindowSize } from "@vueuse/core";
import { watch } from "vue";
import Debug from "./components/Debug.vue";
import EWindowBorder from "./components/EWindowBorder.vue";

const { height } = useWindowSize();
const appHeight = useCssVar("--app-height");
watch(height, (newHeight) => (appHeight.value = `${newHeight}px`), {
  immediate: true,
});
</script>

<template>
  <EWindowBorder />
  <router-view />
  <Debug />
</template>
