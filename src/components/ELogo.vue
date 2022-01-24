<script setup lang="ts">
type Props = {
  el?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | string;
  size?: "sm" | "md" | "lg";
};

const { el = "span", size = "md" } = defineProps<Props>();
</script>

<template>
  <component :is="el" :class="size" class="ELogo">eˉlektron</component>
</template>

<style scoped>
.ELogo {
  font-family: "font-title-regular";
  font-size: var(--text-3xl);
  text-transform: lowercase;
  letter-spacing: -0.045em;
  line-height: 1;
}
.ELogo.sm {
  font-size: var(--text-base);
}
.ELogo.md {
  font-size: var(--text-3xl);
}
.ELogo.lg {
  font-size: var(--text-5xl);
}
</style>
