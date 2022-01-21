<script setup lang="ts">
import { computed } from "vue";
import ELabel from "./ELabel.vue";
import randomString from "../utils/randomString";

type Props = {
  modelValue?: string;
  name: string;
  options: string[];
  disabled?: boolean;
};

const {
  modelValue = "",
  name,
  options,
  disabled = false,
} = defineProps<Props>();

const fieldIds = [] as string[];
for (let i = 0; i < options.length; i++) {
  fieldIds.push(randomString());
}

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="EFormRadio" v-for="(option, index) in options">
    <input
      type="radio"
      :name="name"
      :disabled="disabled"
      :value="option"
      :id="fieldIds[index]"
      v-model="inputValue"
    />
    <ELabel layout="horizontal" :disabled="disabled" :fieldId="fieldIds[index]">
      {{ option }}
    </ELabel>
  </div>
</template>

<style scoped>
.EFormRadio {
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
