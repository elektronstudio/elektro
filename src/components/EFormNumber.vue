<script setup lang="ts">
import { computed } from "vue";
import EInput from "./EInput.vue";
import ELabel from "./ELabel.vue";

type Props = {
  placeholder?: string;
  label?: string;
  modelValue?: string | number;
  fieldId?: string;
};

const { modelValue = "", placeholder, label, fieldId } = defineProps<Props>();

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
  <ELabel v-if="label" :label="label">
    <EInput
      :placeholder="placeholder"
      v-model="inputValue"
      :fieldId="fieldId"
      type="number"
    />
  </ELabel>
  <EInput
    v-else
    :placeholder="placeholder"
    v-model="inputValue"
    :fieldId="fieldId"
    type="number"
  />
</template>
