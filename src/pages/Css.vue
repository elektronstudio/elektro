<script setup lang="ts">
import { ETitle, EButton, ETitleTw, EButtonTw } from "../lib";
</script>

<template>
  <pre class="pt-8 pb-4">ETitle (CSS vars)</pre>

  <ETitle size="lg">Title lg</ETitle>
  <ETitle size="md">Title md</ETitle>
  <ETitle size="sm" class="!text-[rebeccapurple]">
    Title sm with color override
  </ETitle>

  <pre class="pt-8 pb-4">EButton (CSS vars)</pre>

  <div class="grid sm:flex gap-4 items-start">
    <EButton size="lg">Button lg</EButton>
    <EButton size="md" el="a">Button md as a element</EButton>
    <EButton size="sm" class="!text-[rebeccapurple]"
      >Button sm with color override</EButton
    >
  </div>

  <pre class="pt-8 pb-4">ETitleTw (Tailwind)</pre>

  <ETitleTw size="lg">Title lg</ETitleTw>
  <ETitleTw size="md">Title md</ETitleTw>
  <ETitleTw size="sm" class="!text-[rebeccapurple]">
    Title sm with color override
  </ETitleTw>

  <pre class="pt-8 pb-4">EButtonTw (Tailwind)</pre>

  <div class="grid sm:flex gap-4 items-start">
    <EButtonTw size="lg">Button lg</EButtonTw>
    <EButtonTw size="md" el="a">Button md as a element</EButtonTw>
    <EButtonTw size="sm" class="!text-[rebeccapurple]">
      Button sm with color override
    </EButtonTw>
  </div>
</template>
