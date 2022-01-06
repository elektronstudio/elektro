<script setup lang="ts">
import { useCssVar } from "@vueuse/core";
import { ETitle } from "../lib";
import vars from "../vars.json";

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
  <ETitle size="lg">Other vars</ETitle>
  <template v-for="(group, groupKey) in vars">
    <ETitle>{{ groupKey }}</ETitle>
    <pre v-for="(v, key) in group">{{ key }}: {{ v }}</pre>
  </template>
</template>
