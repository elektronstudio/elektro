<script setup lang="ts">
import { useCssVar } from "@vueuse/core";
import { ETitle } from "../lib";

const fg = useCssVar("--fg");
const bg = useCssVar("--bg");
const accent = useCssVar("--accent");
</script>

<template>
  <ETitle size="lg">Colors</ETitle>
  <pre>--fg:</pre>
  <input type="color" v-model="fg" />
  <pre>--bg:</pre>
  <input type="color" v-model="bg" />
  <pre>--accent:</pre>
  <input type="color" v-model="accent" />
</template>
