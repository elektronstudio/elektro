<script setup lang="ts">
import { Test } from "../lib";

const onMouse = (mouse: { x: number; y: number }) =>
  alert(`Got x ${mouse.x} y ${mouse.y}`);
</script>

<template>
  <router-view></router-view>
  <Test @mouse="onMouse" />
</template>
