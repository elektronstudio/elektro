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
};

const {
  modelValue = "",
  name,
  placeholder,
  label,
  disabled,
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
  <ELabel v-if="label" :fieldId="fieldId" :disabled="disabled">
    {{ label }}
  </ELabel>
  <textarea
    className="ETextarea"
    v-model="inputValue"
    :placeholder="placeholder"
    :name="name"
    :id="fieldId"
    :disabled="disabled"
  />
</template>

<style scoped>
.ETextarea {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--p-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  border: 1px solid var(--gray-300);
  background-color: var(--bg);
  padding: var(--p-1) var(--p-2);
}
.ETextarea::placeholder {
  color: var(--gray-300);
}
.ETextarea:focus {
  outline: none;
  border-color: var(--fg);
}
.ETextarea:not(:disabled):hover {
  background-color: rgba(250, 250, 250, 0.1);
}
.ETextarea:disabled {
  border-color: var(--gray-500);
  color: var(--gray-500);
  cursor: not-allowed;
}
.ETextarea:disabled::placeholder {
  color: var(--gray-500);
}
</style>
