<script setup lang="ts">
import { ContentType } from "../utils";
import EChat from "./EChat.vue";
import EVideoStream from "./EVideoStream.vue";
import EStack from "./EStack.vue";
import EContent from "./EContent.vue";
import { useStorage } from "@vueuse/core";

import { randomString } from "../utils";

type Props = {
  contentType: ContentType;
  data: any;
};

const userId = useStorage("elektron_user_id", randomString());
const userName = useStorage("elektron_user_name", "User");
const channel = "test2";

const { contentType } = defineProps<Props>();
</script>
<template>
  <EChat
    v-if="contentType === 'chat'"
    :channel="channel"
    :user-id="userId"
    :user-name="userName"
    new-messages-string="New messages"
  />
  <EVideoStream v-else-if="contentType === 'video'" :src="data.src" />
  <EStack v-else-if="contentType === 'event'" style="padding: var(--p-5)">
    <EContent>
      <p>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
        lacinia odio sem nec elit. Maecenas faucibus mollis interdum. Aenean eu
        leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
        Aenean eu fleo quam. Pellentesque ornare sem lacinia quam venenatis
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
