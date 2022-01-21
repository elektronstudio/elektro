<script setup lang="ts">
import ExampleParent from "./ExampleParent.vue";
type Props = {
  name: string;
};
const props = defineProps<Props>();
</script>

<template>
  <ExampleParent v-bind="props" :age="100" />
</template>
