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
    <EContent>
      <p>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Maecenas faucibus mollis interdum. Aenean eu
        leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </p>
      <p>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Maecenas faucibus mollis interdum. Aenean eu
        leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </p>
      <p>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Maecenas faucibus mollis interdum. Aenean eu
        leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
        vestibulum.
      </p>
    </EContent>
  </EStack>
</template>
