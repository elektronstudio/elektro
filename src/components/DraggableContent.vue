<script setup lang="ts">
import { ContentType } from "../utils";
import EChat from "./EChat.vue";

type Props = {
  contentType: ContentType;
};

const { contentType } = defineProps<Props>();
</script>
<template>
  <!-- @TODO: Add dynamic components work -->
  <!-- <component
          v-if="draggable.contentType"
          :is="findComponent(draggable.contentType)"
        /> -->
  <EChat v-if="contentType === 'chat'" />
</template>
