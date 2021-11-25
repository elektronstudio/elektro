<script setup lang="ts">
import Test from "./components/Test.vue";

const onMouse = (mouse: { x: number; y: number }) =>
  alert(`Got x ${mouse.x} y ${mouse.y}`);
</script>

<template>
  <Test @mouse="onMouse" />
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
