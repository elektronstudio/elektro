<script setup lang="ts">
import { EStack, EBox, EButton } from "../lib";
import ETitle from "../components/ETitle.vue";
</script>
<template>
  <EStack class="Stack">
    <ETitle>Vertical</ETitle>
    <EStack>
      <EBox>Hello</EBox>
      <EBox>World</EBox>
      <div><EButton>Hello</EButton></div>
    </EStack>
    <br />
    <ETitle>Horizontal</ETitle>
    <EStack layout="horizontal" :cols="3">
      <EBox>Hello</EBox>
      <EBox>World</EBox>
      <div><EButton>Hello</EButton></div>
    </EStack>
  </EStack>
</template>

<style scoped>
.Stack {
  padding: var(--p-4);
}
</style>
