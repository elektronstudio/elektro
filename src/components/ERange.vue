<script setup lang="ts">
import ELabel from "./ELabel.vue";
import EInput from "./EInput.vue";
type Props = {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  showMinMax?: boolean;
  showOutput?: boolean;
};

const {
  label,
  value = 0,
  min = 0,
  max = 10,
  step = 1,
  showMinMax,
  showOutput,
} = defineProps<Props>();
</script>
<template>
  <div class="ERange">
    <!-- <ELabel :label="label" /> -->
    <span v-if="showMinMax && !showOutput" class="min">{{ min }}</span>
    <input
      type="range"
      id="points"
      name="points"
      :min="min"
      :max="max"
      :step="step"
      v-model="value"
    />
    <span v-if="showMinMax && !showOutput" class="max">{{ max }}</span>
    <EInput
      v-if="showOutput && !showMinMax"
      v-model="value"
      type="number"
      :min="min"
      :max="max"
    />
  </div>
</template>

<style scoped>
.ERange {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  accent-color: var(--accent);
  width: 100%;
  display: flex;
  align-items: center;
}
.ERange .min {
  margin-right: var(--m-2);
}
.ERange .max {
  margin-left: var(--m-2);
}

.ERange input {
  width: 100%;
}

.ERange .EInput {
  margin-left: var(--m-4);
  max-width: 4rem;
}
</style>
