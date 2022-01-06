<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
import routes from "virtual:generated-pages";
import { ref } from "vue";
import ETitle from "./ETitle.vue";

const rs = Object.values(routes)
  .map((r) => r.path)
  .sort();

const showDebug = ref(false);

onKeyStroke("d", (e) => {
  showDebug.value = !showDebug.value;
});
</script>
<template>
  <div class="Debug" v-show="showDebug">
    <ETitle>Routes</ETitle>
    <RouterLink v-for="r in rs" :to="r">
      <pre>{{ r }}</pre>
    </RouterLink>
  </div>
</template>

<style scoped>
.Debug {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20vw;
  padding: var(--gap-4);
  background: rgba(255, 255, 255, 0.05);
  overflow: auto;
  overscroll-behavior-y: contain;
  white-space: pre-wrap;
  font-size: var(--text-xs);
}
</style>
