<script setup lang="ts">
const sizes = {
  sm: { class: "text-sm", el: "h3" },
  md: { class: "text-xl", el: "h2" },
  lg: { class: "text-3xl", el: "h1" },
};

type Props = {
  size?: keyof typeof sizes;
  el?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
const { size = "md", el } = defineProps<Props>();
</script>
<template>
  <component
    :is="el || sizes[size].el"
    class="font-bold"
    :class="sizes[size].class"
  >
    <slot />
  </component>
</template>
