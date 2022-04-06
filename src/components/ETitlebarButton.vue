<script setup lang="ts">
import IconSize from "~icons/radix-icons/size";
import IconMinus from "~icons/radix-icons/minus";
import IconPlus from "~icons/radix-icons/plus";
import IconCross1 from "~icons/radix-icons/cross-1";

type Props = {
  icon: "size" | "minus" | "plus" | "cross";
};

const { icon } = defineProps<Props>();
</script>

<template>
  <button class="ETitlebarButton">
    <IconSize v-if="icon === 'size'" />
    <IconMinus v-else-if="icon === 'minus'" />
    <IconCross1 v-else-if="icon === 'cross'" />
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
