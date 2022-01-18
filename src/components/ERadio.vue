<script setup lang="ts">
import ELabel from "./ELabel.vue";
type Props = {
  value?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
};

const { value, name, label, disabled = false } = defineProps<Props>();
</script>

<template>
  <ELabel
    v-if="label"
    class="ERadio"
    :label="label"
    layout="horizontal"
    :disabled="disabled"
  >
    <input type="radio" :name="name" :value="value" :disabled="disabled" />
  </ELabel>
  <input v-else type="radio" :name="name" :value="value" :disabled="disabled" />
</template>

<style scoped>
.ERadio.ELabel {
  display: flex;
  align-items: center;
}
input {
  appearance: none;
  background-color: var(--form-background);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  width: var(--w-4);
  height: var(--w-4);
  border: 1px solid currentColor;
  background-color: currentColor;
  display: grid;
  place-items: center;
  border-radius: var(--rounded-full);
}
input:checked::before {
  content: "";
  width: 0.3rem;
  height: 0.3rem;
  background-color: var(--bg);
}
input:focus {
  outline: 1px solid var(--gray-300);
}
input:hover {
  color: var(--gray-200);
}
input:disabled {
  color: var(--gray-500);
  cursor: not-allowed;
}
</style>
