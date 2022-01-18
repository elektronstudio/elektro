<script setup lang="ts">
import EButton from "./EButton.vue";
type Props = {
  title: string;
  thumbnail?: string;
  ticketUrl?: string;
  startTime: string;
};

const { title, startTime, ticketUrl } = defineProps<Props>();

// @TODO: use countdown hook
const countDown = startTime;
</script>
<template>
  <div class="ELivePreview">
    <aside>
      <header>
        <p><span>Live:</span>{{ title }}</p>
        <p><span>Algab:</span>{{ countDown }}</p>
      </header>
      <footer>
        <EButton
          el="a"
          size="xs"
          color="accent"
          target="_blank"
          :href="ticketUrl"
        >
          OSTA PILET
        </EButton>
        <EButton size="xs" el="a" color="gray">Registreeri pilet</EButton>
      </footer>
    </aside>
    <img :src="thumbnail" />
  </div>
</template>

<style scoped>
.ELivePreview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--gray-300);
  border-radius: var(--rounded-3xl);
  overflow: hidden;
  aspect-ratio: 2 / 1;
}
.ELivePreview aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--p-3);
}
.ELivePreview aside header {
  font-family: font-title-medium, sans-serif;
  font-size: var(--text-3xl);
}
.ELivePreview aside header p span {
  color: var(--gray-300);
  width: 42%;
  display: inline-block;
}
.ELivePreview aside footer {
  display: flex;
  gap: var(--gap-5);
}
.ELivePreview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
