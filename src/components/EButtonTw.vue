<script setup lang="ts">
const sizes = {
  sm: "text-sm px-2 py-1",
  md: "text-md px-3 py-2",
  lg: "text-lg px-4 py-3",
};

type Props = {
  size?: keyof typeof sizes;
  el?: "button" | "a";
};

const { size = "md", el = "button" } = defineProps<Props>();
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
    :class="sizes[size]"
  >
    <slot />
  </component>
</template>
