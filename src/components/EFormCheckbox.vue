<script setup lang="ts">
import { computed } from "vue";
import randomString from "../utils/randomString";
import ELabel from "./ELabel.vue";
type Props = {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
};

const { modelValue = false } = defineProps<Props>();

const fieldId = randomString();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="EFormCheckbox">
    <input
      type="checkbox"
      :checked="inputValue"
      :disabled="disabled"
      :id="fieldId"
    />
    <ELabel
      v-if="label"
      :fieldId="fieldId"
      :disabled="disabled"
      layout="horizontal"
    >
      {{ label }}
    </ELabel>
  </div>
</template>

<style scoped>
.EFormCheckbox {
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
