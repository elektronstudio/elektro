<script setup lang="ts">
import EBox from "./EBox.vue";
import ETitle from "../components/ETitle.vue";
import EContent from "../components/EContent.vue";

type Props = {
  card: {
    layout: "column-1" | "column-1-3" | "column-2-4" | "column-4-4";
    color?: "accent" | "gray";
    title?: string;
    content?: string;
    columns: {
      title?: string;
      content?: string;
    }[];
  };
};

const { card } = defineProps<Props>();
</script>
<template>
  <EBox
    :class="card.layout"
    :ratio="card.layout === 'column-1' ? '1 / 1' : 'auto'"
    :color="card.color"
  >
    <div v-if="card.columns" v-for="column in card.columns">
      <ETitle v-if="column.title" el="h3" size="lg">{{ column.title }}</ETitle>
      <EContent v-if="column.content" :content="column.content" />
    </div>
    <template v-else>
      <ETitle v-if="card.title" el="h3" size="lg">{{ card.title }}</ETitle>
      <EContent v-if="card.content" :content="card.content" />
    </template>
  </EBox>
</template>

<style scoped>
.EBox.column-1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-column: span 2;
}
.EBox.column-1-3 {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: var(--gap-5);
  grid-column: span 4;
}
.EBox.column-2-4 {
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-gap: var(--gap-5);
  grid-column: span 6;
}
.EBox.column-4-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--gap-5);
  grid-column: span 8;
}
</style>
