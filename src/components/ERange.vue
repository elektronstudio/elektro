<script setup lang="ts">
import { computed } from "vue";
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

const backgroundSize = computed(
  () => ((value - min) * 100) / (max - min) + "% 100%",
);
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
      :style="{ backgroundSize }"
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

input[type="range"] {
  appearance: none;
  width: 100%;
  height: var(--h-px);
  background-color: var(--gray-300);
  background-image: linear-gradient(var(--accent), var(--accent));
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: var(--w-4);
  width: var(--h-4);
  border-radius: 50%;
  background: var(--fg);
  cursor: ew-resize;
  box-shadow: none;
  border: none;
  outline: none;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  appearance: none;
  height: var(--w-4);
  width: var(--h-4);
  border-radius: 50%;
  background: var(--fg);
  cursor: ew-resize;
  box-shadow: none;
  border: none;
  outline: none;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-ms-thumb {
  appearance: none;
  height: var(--w-4);
  width: var(--h-4);
  border-radius: 50%;
  background: var(--fg);
  cursor: ew-resize;
  box-shadow: none;
  border: none;
  outline: none;
  transition: background 0.2s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: var(--gray-300);
}
input[type="range"]::-moz-range-thumb:hover {
  background: var(--gray-300);
}
input[type="range"]::-ms-thumb:hover {
  background: var(--gray-300);
}

/* Input Track */
input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
input[type="range"]::-moz-range-track {
  appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
input[type="range"]::-ms-track {
  appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
.ERange .EInput {
  margin-left: var(--m-4);
  max-width: 4rem;
}
</style>
