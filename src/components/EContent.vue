<script setup lang="ts">
// TODO: find proper ElementType typing
type Props = {
  el?: "article" | "section" | string;
};

const { el = "article" } = defineProps<Props>();
</script>

<template>
  <component :is="el" class="EContent">
    <slot />
  </component>
</template>

<style scoped>
.EContent > :deep(*:not(:last-child)) {
  /* Is this the correct TW variable? */
  /* Also? */
  margin-bottom: var(--gap-3);
}
.EContent :deep(p) {
  font-size: var(--text-base);
  line-height: var(--line-height-sm);
}
.EContent :deep(a) {
  border-bottom: 1px solid;
  border-image: url("/images/bg-texture-xs.gif") 1;
}
.EContent :deep(a):hover {
  border-bottom: none;
  /* TODO: how to deal with lighter variants for colors, opacity not ideal. Works with dark and light tones tho. */
  opacity: var(--opacity-60);
}
.EContent :deep(h1),
.EContent :deep(h2),
.EContent :deep(h3) {
  margin-top: var(--gap-2);
  font-size: var(--text-3xl);
}
.EContent :deep(h4),
.EContent :deep(h5),
.EContent :deep(h6) {
  font-family: font-body-55rg, sans-serif;
}

.EContent :deep(h4) {
  font-weight: bold;
}
.EContent :deep(h6) {
  font-size: var(--text-xs);
}
</style>
