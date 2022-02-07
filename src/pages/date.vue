<script setup lang="ts">
import { sub, add } from "date-fns";
import ETitle from "../components/ETitle.vue";
import EBox from "../components/EBox.vue";
import { useRange } from "../utils/date";

const ranges = [
  {
    start_at: sub(new Date(), { hours: 2 }),
    end_at: sub(new Date(), { hours: 1 }),
  },
  {
    start_at: sub(new Date(), { minutes: 10 }),
    end_at: add(new Date(), { hours: 1 }),
  },
  {
    start_at: add(new Date(), { days: 2 }),
    end_at: add(new Date(), { days: 2, hours: 2 }),
  },
].map((range) => ({
  ...range,
  ...useRange(range.start_at, range.end_at),
}));
</script>

<template>
  <div class="Date">
    <ETitle size="lg">Date formatting</ETitle>
    <EBox v-for="range in ranges">
      <pre>{{ range }}</pre>
    </EBox>
  </div>
</template>
<style scoped>
.Date {
  display: grid;
  gap: var(--gap-4);
  padding: var(--p-4);
}
</style>
