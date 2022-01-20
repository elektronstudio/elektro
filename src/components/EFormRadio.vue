<script setup lang="ts">
import { computed } from "vue";
import ELabel from "./ELabel.vue";
type Props = {
  modelValue?: string;
  options: string[];
  fieldId?: string;
  disabled?: boolean;
};

const { modelValue = "", fieldId, disabled = false } = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void; // add correct value type when you know it
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <ELabel
    v-for="option in options"
    class="EFormRadio"
    :label="option"
    layout="horizontal"
    :disabled="disabled"
  >
    <input
      type="radio"
      :fieldId="fieldId"
      :disabled="disabled"
      :value="option"
      v-model="inputValue"
    />
  </ELabel>
</template>

<style scoped>
.EFormRadio.ELabel {
  display: flex;
  align-items: center;
}
.EFormRadio input {
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
.EFormRadio input:checked::before {
  content: "";
  width: 0.3rem;
  height: 0.3rem;
  background-color: var(--bg);
}
.EFormRadio input:focus {
  outline: 1px solid var(--gray-300);
}
.EFormRadio input:hover {
  color: var(--gray-200);
}
.EFormRadio input:disabled {
  color: var(--gray-500);
  cursor: not-allowed;
}
</style>
