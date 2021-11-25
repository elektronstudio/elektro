<script setup lang="ts">
const classes = {
  sm: { class: "text-sm", el: "h3" },
  md: { class: "text-xl", el: "h2" },
  lg: { class: "text-3xl", el: "h1" },
};

type Size = keyof typeof classes;
type El = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const { size = "md", el } = defineProps<{ size?: Size; el?: El }>();
</script>
<template>
  <component
    :is="el || classes[size].el"
    class="font-bold"
    :class="classes[size].class"
  >
    <slot />
  </component>
</template>
