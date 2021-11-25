<script setup lang="ts">
import { ETitle, EButton } from "../lib";
</script>

<template>
  <ETitle size="lg">Title lg</ETitle>
  <ETitle size="md">Title md</ETitle>
  <ETitle size="sm" class="!text-[rebeccapurple]">
    Title sm with color override
  </ETitle>
  <p class="h-8" />
  <div class="grid sm:flex gap-4 items-start">
    <EButton size="lg">Button lg</EButton>
    <EButton size="md" el="a">Button md as a element</EButton>
    <EButton size="sm" class="!text-[rebeccapurple]"
      >Button sm with color override</EButton
    >
  </div>
</template>
