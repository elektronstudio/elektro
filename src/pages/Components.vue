<script setup lang="ts">
import { ETitle, EButton } from "../lib";
</script>

<template>
  <ETitle size="lg">Components</ETitle>

  <br />
  <pre>ETitle</pre>

  <ETitle size="lg">Title lg</ETitle>
  <ETitle size="md">Title md</ETitle>
  <ETitle size="sm">Title sm</ETitle>

  <br />
  <pre>EButton</pre>

  <div style="display: flex; align-items: flex-start; gap: var(--gap-4)">
    <EButton size="lg">Button lg</EButton>
    <EButton size="md">Button md as a element</EButton>
    <EButton size="sm" el="a">Button sm as a element</EButton>
  </div>
</template>
