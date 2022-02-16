<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ETitle,
  EFormText,
  EButton,
  validateTicket,
  Ticketable,
  getTicketableStatus,
} from "../lib";

const code = ref("EI9BBMTEGE");
const ticketable = ref<Ticketable | null>(null);

const onSubmit = () => {
  if (code.value) {
    validateTicket(code.value).then((t) => {
      ticketable.value = t;
    });
  }
};

const ticketableStatus = computed(() => {
  if (ticketable.value) {
    const ticketables: Ticketable[] = [
      ticketable.value,
      ticketable.value.festival,
    ];
    return getTicketableStatus(ticketables);
  }
});
</script>

<template>
  <div class="Strapi">
    <ETitle size="lg">Strapi</ETitle>
    <EFormText v-model="code" label="Ticket code" />
    <EButton @click="onSubmit">Submit</EButton>
    <pre>{{ ticketableStatus }}</pre>
    <pre>{{ ticketable }}</pre>
  </div>
</template>

<style scoped>
.Strapi {
  display: grid;
  gap: var(--gap-4);
  padding: var(--p-4);
}
</style>
