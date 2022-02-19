<script setup lang="ts">
import EBox from "./EBox.vue";
import ETitle from "../components/ETitle.vue";
import EContent from "../components/EContent.vue";

type Props = {
  title?: string;
  slug?: string;
};

const { title } = defineProps<Props>();
</script>
<template>
  <EBox color="accent" ratio="1 / 1" layout="columns1">
    <ETitle v-if="title" el="h3" size="lg" :title="title" />
    <!-- <RouterLink :to="slug">
      <EContent>Read more</EContent>
    </RouterLink> -->
  </EBox>
</template>

<style scoped>
.EBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
