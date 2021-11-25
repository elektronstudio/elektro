<script setup lang="ts">
import routes from "virtual:generated-pages";
</script>
<template>
  <RouterLink to="/">Index</RouterLink>
  &nbsp;
  <RouterLink to="/test">Test</RouterLink>
  <router-view />
</template>

<style>
body {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 32px;
  box-sizing: border-box;
}
</style>
