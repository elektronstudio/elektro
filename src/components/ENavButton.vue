<template>
  <a class="ENavButton">
    <slot />
  </a>
</template>

<style scoped>
.ENavButton {
  display: inline-flex;
  padding: var(--p-1);
  border: var(--border-DEFAULT) solid var(--gray-500);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--gray-300);
}
.ENavButton:not(:first-child) {
  margin-left: calc(var(--border-DEFAULT) * -1);
}
.ENavButton:hover {
  border-image: url("/images/bg-texture-xs.gif") 1;
  z-index: 2;
}
</style>
