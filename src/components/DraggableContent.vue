<script setup lang="ts">
import { ContentType } from "../utils";
import EChat from "./EChat.vue";
import EVideoStream from "./EVideoStream.vue";
import EStack from "./EStack.vue";
import ETitle from "./ETitle.vue";
import EContent from "./EContent.vue";
import EButton from "./EButton.vue";

type Props = {
  contentType: ContentType;
  data: any;
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
  <EVideoStream v-else-if="contentType === 'video'" :src="data.src" />
  <EStack v-else-if="contentType === 'event'" style="padding: var(--p-5)">
    <!-- TODO Reuse existing back button UI -->
    <!-- <RouterLink :to="data.route">
      <EButton size="xs" color="transparent" el="a">
        <IconArrowLeft />
        Back to event
      </EButton>
    </RouterLink> -->
    <ETitle size="lg">Live event: {{ data.title }}</ETitle>
    <EContent v-html="data.intro" />
    <!-- TODO What about event.description? -->
  </EStack>
</template>
