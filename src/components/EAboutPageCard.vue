<script setup lang="ts">
import EBox from "./EBox.vue";
import ETitle from "../components/ETitle.vue";
import EContent from "../components/EContent.vue";

type Props = {
  layout: "column-1" | "column-1-3" | "column-2-4" | "column-4-4";
  title?: string;
  color?: "accent" | "gray";
  content?: string;
  columns?: {
    title?: string;
    content?: string;
  }[];
};

const { layout, color, title, content, columns } = defineProps<Props>();
</script>
<template>
  <EBox
    :class="layout"
    :ratio="layout === 'column-1' ? '1 / 1' : 'auto'"
    :color="color"
  >
    <div v-if="columns" v-for="column in columns">
      <ETitle v-if="column.title" el="h3" size="lg">{{ column.title }}</ETitle>
      <EContent v-if="column.content" :content="column.content" />
    </div>
    <template v-else>
      <ETitle v-if="title" el="h3" size="lg">{{ title }}</ETitle>
      <EContent v-if="content" :content="content" />
    </template>
  </EBox>
</template>

<style scoped>
.EBox {
  grid-column: span 2;
}
.EBox.column-1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}
.EBox.column-4-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--gap-5);
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 600px) {
  .EBox.column-4-4,
  .EBox.column-2-4 {
    grid-column: span 4;
  }
}
/* @TODO: Add breakpoints system */
@media only screen and (min-width: 1240px) {
  .EBox.column-2-4 {
    grid-column: span 6;
  }
  .EBox.column-4-4 {
    grid-column: span 8;
  }
}
</style>
