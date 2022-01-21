<script setup lang="ts">
type Props = {
  name: string;
  age: number;
};
defineProps<Props>();
</script>

<template>
  <div>Hello {{ name }}, {{ age }}</div>
</template>
