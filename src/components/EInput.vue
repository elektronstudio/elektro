<script setup lang="ts">
type Props = {
  placeholder?: string;
  modelValue?: string | number;
  name?: string;
  type?: "number" | "text";
};

const { placeholder, modelValue, name, type } = defineProps<Props>();
</script>

<template>
  <!-- @TODO: Should we add preventDefault? or we do not use keyboard shortcuts in production -->
  <input
    className="EInput"
    :value="modelValue"
    :placeholder="placeholder"
    :name="name"
    :type="type"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
