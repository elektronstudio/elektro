<script setup lang="ts">
const buttonSizes = {
  sm: "text-sm px-3 py-2",
  md: "text-md px-4 py-3",
  lg: "text-lg px-4 py-4",
};

type ButtonSize = keyof typeof buttonSizes;

const { size = "md" } = defineProps<{ size?: ButtonSize }>();
</script>
<template>
  <button
    class="
      border-2 border-gray-500
      bg-none
      hover:bg-gray-50
      text-gray-500
      font-bold
    "
    :class="buttonSizes[size]"
  >
    <slot />
  </button>
</template>
