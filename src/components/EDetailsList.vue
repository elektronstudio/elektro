<script setup lang="ts">
type Props = {
  details: {
    detail: string;
    value: string;
  }[];
};

const { details } = defineProps<Props>();
</script>

<template>
  <ul class="EDetailsList">
    <li v-for="detail in details">
      <span>{{ detail.detail }}:</span>
      <span>{{ detail.value }}</span>
    </li>
  </ul>
</template>

<style scoped>
.EDetailsList {
  color: var(--gray-300);
  font-size: var(--text-xs);
  line-height: var(--line-height-xs);
}
.EDetailsList li {
  display: flex;
  margin-bottom: var(--m-3);
}
.EDetailsList li span:first-child {
  display: inline-block;
  min-width: 16ch;
  width: 16ch;
}
</style>
