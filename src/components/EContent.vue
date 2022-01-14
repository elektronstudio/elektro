<script setup lang="ts">
type Props = {
  el?: "article" | "section" | string;
  size?: "sm" | "md" | "lg";
  content?: string;
};

const { el = "article", size = "md", content } = defineProps<Props>();
</script>

<template>
  <component
    v-if="content"
    :is="el"
    :class="size"
    class="EContent"
    v-html="content"
  />
  <component v-else :is="el" :class="size" class="EContent">
    <slot />
  </component>
</template>

<style scoped>
.EContent > :deep(*:not(:last-child)) {
  /* Is this the correct TW variable? */
  margin-bottom: var(--gap-6);
}
.EContent :deep(p) {
  font-size: var(--text-base);
  line-height: var(--line-height-sm);
}
.EContent.sm :deep(p) {
  font-size: var(--text-xs);
}
.EContent.lg :deep(p) {
  font-size: var(--text-3xl);
  font-family: font-title-medium, sans-serif;
  line-height: var(--line-height-xs);
}
.EContent :deep(a) {
  border-bottom: 1px solid;
  border-image: url("/images/bg-texture-xs.gif") 1;
}
.EContent :deep(a):hover {
  border-bottom: none;
  /* @TODO: how to deal with lighter variants for colors, opacity not ideal. Works with dark and light tones tho. */
  opacity: var(--opacity-60);
}
.EContent :deep(blockquote) {
  font-size: var(--text-3xl);
  font-family: font-title-medium, sans-serif;
  line-height: var(--line-height-xs);
  background-image: url("/images/bg-texture-xs.gif");
  background-repeat: repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.EContent :deep(small) {
  font-size: var(--text-xs);
}
.EContent :deep(h1),
.EContent :deep(h2),
.EContent :deep(h3) {
  line-height: var(--line-height-5xl);
  font-size: var(--text-3xl);
}
.EContent :deep(h1):not(:first-child),
.EContent :deep(h2):not(:first-child),
.EContent :deep(h3):not(:first-child) {
  margin-top: var(--gap-2);
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
