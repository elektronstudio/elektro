<script setup lang="ts">
const sizes = {
  xs: "h4",
  sm: "h3",
  md: "h2",
  lg: "h1",
};

type Props = {
  size?: keyof typeof sizes;
  el?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title?: string;
};

const { size = "md", el, title } = defineProps<Props>();
</script>

<template>
  <component
    v-if="title"
    :is="el || sizes[size]"
    class="ETitle"
    :class="size"
    v-html="title"
  />
  <component v-else :is="el || sizes[size]" class="ETitle" :class="size">
    <slot />
  </component>
</template>

<style scoped>
.ETitle {
  font-weight: normal;
  line-height: var(--line-height-5xl);
}
.ETitle.xs {
  font-family: font-body-55, sans-serif;
  font-size: var(--text-base);
  line-height: var(--line-height-sm);
}
.ETitle.sm {
  font-size: var(--text-sm);
}
.ETitle.md {
  font-size: var(--text-xl);
}
.ETitle.lg {
  font-size: var(--text-3xl);
}
</style>
