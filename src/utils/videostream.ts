import { ref, watch, onMounted, onUnmounted } from "vue";

import Hls from "hls.js";

type VideostreamStatus = "nodata" | "loading" | "playing";

export const useVideostream = (videoSrc: string) => {
  const videoRef = ref<HTMLVideoElement | null>(null);
  const status = ref<VideostreamStatus>("nodata");
  const width = ref(640);
  const height = ref((640 * 9) / 16);
  const retryDelay = 3000;

  let hls: Hls;

  watch(
    [videoRef, videoSrc],
    () => {
      if (videoRef.value) {
        if (videoRef.value.canPlayType("application/vnd.apple.mpegURL")) {
          playSafariHls();
        } else {
          if (Hls.isSupported()) {
            playHls();
          }
        }
      }
    },
    { immediate: true },
  );

  const playSafariHls = () => {
    if (videoRef.value) {
      videoRef.value.src = videoSrc;
      let prevEnd = 0;
      setInterval(() => {
        if (videoRef.value) {
          if (videoRef.value.seekable.length >= 1) {
            const currentEnd = videoRef.value.seekable.end(0);
            if (prevEnd === currentEnd) {
              videoRef.value.src = videoSrc;
              videoRef.value.play();
            }
            prevEnd = currentEnd;
          }
        }
      }, retryDelay);
    }
  };

  const playHls = () => {
    if (videoRef.value) {
      hls = new Hls({
        debug: false,
        manifestLoadingRetryDelay: retryDelay,
        manifestLoadingMaxRetry: Infinity,
        xhrSetup: function (xhr) {
          xhr.addEventListener("error", (e) => {
            hls.loadSource(videoSrc);
            hls.startLoad();
            if (videoRef.value) {
              videoRef.value.play();
            }
          });
        },
      });

      hls.attachMedia(videoRef.value);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(videoSrc);
        hls.startLoad();
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        hls.recoverMediaError();
        if (data.type !== Hls.ErrorTypes.MEDIA_ERROR) {
          hls.startLoad();
        }
      });

      let prevEnd = 0;
      setInterval(() => {
        if (videoRef.value) {
          if (videoRef.value.seekable.length >= 1) {
            const currentEnd = videoRef.value.seekable.end(0);
            if (prevEnd === currentEnd) {
              hls.loadSource(videoSrc);
              hls.startLoad();
              if (videoRef.value) {
                videoRef.value.play();
              }
            }
            prevEnd = currentEnd;
          }
        }
      }, 10000);
    }
  };

  onMounted(() => {
    if (videoRef.value) {
      videoRef.value.addEventListener("loadeddata", (e) => {
        status.value = "loading";
        width.value =
          videoRef.value && videoRef.value.videoWidth > 0
            ? videoRef.value?.videoWidth
            : -1;
        height.value =
          videoRef.value && videoRef.value.videoHeight > 0
            ? videoRef.value?.videoHeight
            : -1;
      });

      videoRef.value.addEventListener("playing", (e) => {
        status.value = "playing";
        width.value =
          videoRef.value && videoRef.value.videoWidth > 0
            ? videoRef.value?.videoWidth
            : -1;
        height.value =
          videoRef.value && videoRef.value.videoHeight > 0
            ? videoRef.value?.videoHeight
            : -1;
      });

      videoRef.value.addEventListener("ended", (e) => {
        status.value = "nodata";
      });
    }
  });

  onUnmounted(() => {
    if (hls) {
      hls.destroy();
    }
  });

  return { videoRef, status, width, height };
};
