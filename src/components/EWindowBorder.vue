<template>
  <div class="EWindowBorder" />
</template>

<style scoped>
.EWindowBorder {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  border: 1px solid var(--gray-500);
  pointer-events: none;
}
</style>
