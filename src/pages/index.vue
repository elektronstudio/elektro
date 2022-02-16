<script setup lang="ts">
import { sub, differenceInSeconds } from "date-fns";
import { ETitle } from "../lib";
import ArtNav from "../components/ArtNav.vue";
import { onMounted, ref } from "vue";

const payload = {
  operation: "push_bb1150",
  original: "x_live_1",
  path: "video/2021_11/2021_11_27_x_live_1_c1_5",
  duration: 67,
  keepOriginal: false,
  files: [
    {
      name: "640x360_318_1638020921.mp4",
    },
    {
      name: "640x360_504_1638020921.mp4",
    },
    {
      name: "960x540_827_1638020921.mp4",
    },
    {
      name: "1280x720_1318_1638020921.mp4",
    },
    {
      name: "1920x1080_2414_1638020921.mp4",
    },
  ],
  hd: 1,
};

const videoUrl = `https://pepe-dl.babahhcdn.com/bb1150/${payload.path}/${payload.files[0].name}`;
const lastModified = payload.files[0].name
  .split(".")[0]
  .split("_")
  .slice(-1)[0];
const endDatetime = new Date(parseInt(lastModified) * 1000);
const startDatetime = sub(endDatetime, { seconds: payload.duration });
const diff = differenceInSeconds(endDatetime, startDatetime);
const video = ref<HTMLVideoElement | null>(null);
const data = ref<any>({ startTime: null, duration: null });

onMounted(() => {
  if (video.value) {
    video.value.addEventListener("loadedmetadata", (d) => {
      const startTime = sub(endDatetime, {
        seconds: d?.target?.duration,
      });

      data.value = { startTime, duration: d?.target?.duration };
    });
  }
});
</script>

<template>
  <ArtNav />
  <div class="Index">
    <pre>{{ videoUrl }}</pre>
    <ETitle size="lg">Data from webhook</ETitle>
    <pre>Start: {{ startDatetime }}</pre>
    <pre>End: {{ endDatetime }}</pre>
    <pre>Duration {{ diff }}s </pre>
    <ETitle size="lg">Data from file</ETitle>
    <pre>Start: {{ data.startTime }}</pre>
    <pre>End: {{ endDatetime }} (from webhook)</pre>
    <pre>Duration {{ data.duration }}s </pre>
    <video controls :src="videoUrl" ref="video" />
    <ETitle size="lg">Index page</ETitle>
  </div>
</template>

<style>
.Index {
  padding: var(--p-5);
  display: grid;
  gap: var(--gap-4);
}
</style>
