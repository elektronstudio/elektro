<script setup lang="ts">
import { computed } from "vue";
import ELabel from "./ELabel.vue";
import randomString from "../utils/string";

type ModelValue = string | number;

type Props = {
  modelValue?: ModelValue;
  name?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  type?: "number" | "text" | "email";
};

const {
  modelValue = "",
  name,
  placeholder,
  label,
  disabled,
  type,
} = defineProps<Props>();

const fieldId = randomString();

const emit = defineEmits<{
  (e: "update:modelValue", value: ModelValue): void;
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <!-- @TODO: Should we add preventDefault? or we do not use keyboard shortcuts in production -->
  <ELabel v-if="label" :fieldId="fieldId" :disabled="disabled">
    {{ label }}
  </ELabel>
  <input
    className="EInput"
    v-model="inputValue"
    :placeholder="placeholder"
    :name="name"
    :id="fieldId"
    :type="type"
    :disabled="disabled"
  />
</template>

<style scoped>
.EInput {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--p-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  border: 1px solid var(--gray-300);
  background-color: var(--bg);
  padding: var(--p-1) var(--p-2);
}
.EInput::placeholder {
  color: var(--gray-300);
}
.EInput:focus {
  outline: none;
  border-color: var(--fg);
}
.EInput:not(:disabled):hover {
  background-color: rgba(250, 250, 250, 0.1);
}
.EInput:disabled {
  border-color: var(--gray-500);
  color: var(--gray-500);
  cursor: not-allowed;
}
.EInput:disabled::placeholder {
  color: var(--gray-500);
}
</style>
