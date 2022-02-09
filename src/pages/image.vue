<script setup lang="ts">
import { ETitle, EImage } from "../lib";

const image = {
  large: {
    ext: ".jpg",
    url: "https://elektron.fra1.digitaloceanspaces.com/strapi/8c594b89a52fabe94d29ffd4f3647eb2.jpg",
    hash: "8c594b89a52fabe94d29ffd4f3647eb2",
    mime: "image/jpeg",
    name: "large_plaadikaas(1).jpg",
    path: null,
    size: 139.64,
    width: 1000,
    height: 911,
  },
  small: {
    ext: ".jpg",
    url: "https://elektron.fra1.digitaloceanspaces.com/strapi/2483f5b1399359a4da6b5350c3b33ee8.jpg",
    hash: "2483f5b1399359a4da6b5350c3b33ee8",
    mime: "image/jpeg",
    name: "small_plaadikaas(1).jpg",
    path: null,
    size: 46.37,
    width: 500,
    height: 456,
  },
  medium: {
    ext: ".jpg",
    url: "https://elektron.fra1.digitaloceanspaces.com/strapi/e471eca723cf4ebb8443bf333c2f6904.jpg",
    hash: "e471eca723cf4ebb8443bf333c2f6904",
    mime: "image/jpeg",
    name: "medium_plaadikaas(1).jpg",
    path: null,
    size: 90.95,
    width: 750,
    height: 684,
  },
  thumbnail: {
    ext: ".jpg",
    url: "https://elektron.fra1.digitaloceanspaces.com/strapi/4600b99470fe300799fc1cce94ab104c.jpg",
    hash: "4600b99470fe300799fc1cce94ab104c",
    mime: "image/jpeg",
    name: "thumbnail_plaadikaas(1).jpg",
    path: null,
    size: 7.91,
    width: 171,
    height: 156,
  },
};
</script>

<template>
  <div class="image">
    <ETitle>Images</ETitle>
    <EImage :images="Object.values(image)" />
  </div>
</template>

<style scoped>
.image {
  display: grid;
  gap: var(--gap-4);
  padding: var(--p-4);
}
</style>
