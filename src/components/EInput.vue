<script setup lang="ts">
type Props = {
  placeholder?: string;
  value?: string;
  name?: string;
};

const { placeholder, value } = defineProps<Props>();
</script>

<template>
  <!-- @TODO: Should we add preventDefault? or we do not use keyboard shortcuts in production -->
  <input
    className="EInput"
    :placeholder="placeholder"
    :value="value"
    :name="name"
  />
</template>

<style scoped>
.EInput {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--p-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  border: 1px solid var(--gray-500);
  background-color: var(--bg);
  padding: var(--p-1) var(--p-2);
}
.EInput::placeholder {
  color: var(--gray-500);
}
.EInput:focus {
  outline: none;
  border: 1px solid var(--fg);
}
.EInput:hover {
  background-color: rgba(250, 250, 250, 0.1);
}
</style>
