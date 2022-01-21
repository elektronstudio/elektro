<script setup lang="ts">
import ExampleParent from "../components/ExampleParent.vue";
import ExampleChild from "../components/ExampleChild.vue";
</script>
<template>
  <div>
    <ExampleParent name="Parent" :age="10" />
    <ExampleChild name="Child" />
  </div>
</template>
