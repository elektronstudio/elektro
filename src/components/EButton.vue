<script setup lang="ts">
const classes = {
  sm: "text-sm px-2 py-1",
  md: "text-md px-3 py-2",
  lg: "text-lg px-4 py-3",
};

type Size = keyof typeof classes;
type El = "button" | "a";

const { size = "md", el = "button" } = defineProps<{ size?: Size; el?: El }>();
</script>

<template>
  <component
    :is="el"
    class="
      border-2 border-gray-500
      bg-none
      hover:bg-gray-100
      text-gray-500
      font-bold
      cursor-pointer
    "
    :class="classes[size]"
  >
    <slot />
  </component>
</template>
