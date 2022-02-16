<script setup lang="ts">
//@ts-nocheck
import { addMilliseconds, sub } from "date-fns";
import { ETitle } from "../lib";
import ArtNav from "../components/ArtNav.vue";
import { computed, onMounted, ref } from "vue";

const payload = {
  operation: "push_bb1150",
  original: "x_live_1",
  path: "video/2022_02/2022_02_16_x_live_1_c1_1",
  duration: 5015.796667,
  keepOriginal: false,
  files: [
    {
      name: "640x360_517_1645035077.mp4",
    },
    {
      name: "640x360_1004_1645035079.mp4",
    },
    {
      name: "960x540_1882_1645035087.mp4",
    },
    {
      name: "1280x720_3053_1645035090.mp4",
    },
    {
      name: "1920x1080_5757_1645035094.mp4",
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
const video = ref<HTMLVideoElement | null>(null);
const data = ref<any>({ startTime: null, duration: null });

const format = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const timestamp = ref(0);

const timestampDatetime = computed(() =>
  addMilliseconds(startDatetime, timestamp.value),
);

onMounted(() => {
  if (video.value) {
    video.value.addEventListener("loadedmetadata", (d) => {
      const startTime = sub(endDatetime, {
        seconds: d?.target?.duration,
      });
      data.value = { startTime, duration: d?.target?.duration };
    });
    video.value.addEventListener("timeupdate", (d) => {
      timestamp.value = d.timeStamp;
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
    <pre>Duration {{ payload.duration }}s / {{ format(payload.duration) }}</pre>
    <ETitle size="lg">Data from file</ETitle>
    <pre>Start: {{ data.startTime }}</pre>
    <pre>End: {{ endDatetime }} (from webhook)</pre>
    <pre>Duration {{ data.duration }}s / {{ format(data.duration) }}</pre>
    <video controls :src="videoUrl" ref="video" />
    <pre style="color: orange">Relative progress: {{ timestamp / 1000 }}s</pre>
    <pre style="color: orange">Absolute progress: {{ timestampDatetime }}</pre>
    <ETitle size="lg">Webhook payload</ETitle>
    <pre>{{ payload }}</pre>
  </div>
</template>

<style>
.Index {
  padding: var(--p-5);
  display: grid;
  gap: var(--gap-4);
}
</style>
