<script setup lang="ts">
import EDraggableTitlebar from "./EDraggableTitlebar.vue";
import ETitlebarButton from "./ETitlebarButton.vue";

type Props = {
  title?: string;
};

const { title } = defineProps<Props>();
const emit = defineEmits<{
  (e: "close-dialog"): void;
}>();
</script>

<template>
  <dialog class="EDialog">
    <EDraggableTitlebar :title="title">
      <ETitlebarButton icon="cross" @click="emit('close-dialog')" />
    </EDraggableTitlebar>
    <article>
      <slot />
    </article>
  </dialog>
</template>

<style scoped>
.EDialog {
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  left: auto;
  color: var(--fg);
  border: 1px solid transparent;
}
.EDialog:hover {
  border: 1px solid var(--gray-500);
}
</style>
