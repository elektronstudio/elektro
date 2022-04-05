<script setup lang="ts">
import IconSize from "~icons/radix-icons/size";
import IconMinus from "~icons/radix-icons/minus";
import IconPlus from "~icons/radix-icons/plus";

type Props = {
  icon: "size" | "minus" | "plus";
};

const { icon } = defineProps<Props>();
</script>

<template>
  <button class="ETitlebarButton">
    <IconSize v-if="icon === 'size'" />
    <IconMinus v-else-if="icon === 'minus'" />
    <IconPlus v-else />
  </button>
</template>

<style scoped>
.ETitlebarButton {
  height: var(--h-6);
  width: var(--w-6);
  display: grid;
  place-content: center;
}
.ETitlebarButton svg {
  width: 1em;
  height: 1em;
}
.ETitlebarButton:hover {
  background-color: var(--gray-300);
}
</style>
