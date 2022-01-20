<!-- @TODO: Refactor into a more DRY abstraction -->
<script setup lang="ts">
import { computed } from "vue";
import EInput from "./EInput.vue";

type Props = {
  placeholder?: string;
  label?: string;
  modelValue?: string | number;
  name?: string;
  disabled?: boolean;
};

const {
  modelValue = "",
  placeholder,
  label,
  name,
  disabled,
} = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void; // add correct value type when you know it
}>();

const inputValue = computed({
  get: () => modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <EInput
    v-model="inputValue"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    :disabled="disabled"
    type="text"
  />
</template>
