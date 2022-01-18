<script setup lang="ts">
import { computed } from "vue";
import ELabel from "./ELabel.vue";
type Props = {
  value?: string;
  modelValue?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
};

const { modelValue, name, label, disabled = false } = defineProps<Props>();

// const model = computed({
//   get() {
//     return modelValue
//   },
//   set(value) {
//     $emit('update:modelValue', value)
//   }
// })
</script>

<template>
  <ELabel
    v-if="label"
    class="ERadio"
    :label="label"
    layout="horizontal"
    :disabled="disabled"
  >
    <!-- @TODO: modelValue does not work like this -->
    <input
      type="radio"
      :name="name"
      :disabled="disabled"
      :value="value"
      v-model="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </ELabel>
  <input
    v-else
    type="radio"
    :name="name"
    :value="modelValue"
    :disabled="disabled"
  />
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
