<script setup lang="ts">
import EBox from "./EBox.vue";
import EImage from "./EImage.vue";

type Size = {
  url: string;
  width: number;
  height: number;
};

type Props = {
  sizes: Size[];
  alt?: string;
};

const { sizes, alt = "" } = defineProps<Props>();
</script>

<template>
  <EBox class="EImageCard" layout="columns1">
    <EImage :sizes="sizes" :alt="alt" />
  </EBox>
</template>

<style scoped>
.EBox {
  padding: 0;
  overflow: hidden;
}
.EBox .EImage {
  object-fit: cover;
}
</style>
