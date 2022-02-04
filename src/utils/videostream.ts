import { ref, watch, onMounted, onUnmounted, Ref, UnwrapRef } from "vue";

import Hls from "hls.js";
import { DeepMaybeRef, MaybeElementRef } from "@vueuse/core";

// "paused" is not really an useful for live streams
// although the video player supports it

type VideostreamStatus = "nodata" | "loading" | "playing";
type MaybeRef<T> = Ref<T> | T;

export const useVideostream = (src: MaybeRef<string>, autoResume = false) => {
  const videoSrc = ref(src);
  const videoRef = ref<HTMLVideoElement | null>(null);
  const status = ref<VideostreamStatus>("nodata");
  const width = ref(640);
  const height = ref((640 * 9) / 16);
  const resumeDelay = 10 * 1000;

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
      videoRef.value.src = videoSrc.value;
      if (autoResume) {
        let prevEnd = 0;
        setInterval(() => {
          if (videoRef.value) {
            if (videoRef.value.seekable.length >= 1) {
              const currentEnd = videoRef.value.seekable.end(0);
              if (prevEnd === currentEnd) {
                videoRef.value.src = videoSrc.value;
                videoRef.value.play();
              }
              prevEnd = currentEnd;
            }
          }
        }, resumeDelay);
      }
    }
  };

  const playHls = () => {
    if (videoRef.value) {
      hls = new Hls({
        debug: false,
        manifestLoadingRetryDelay: 3000,
        manifestLoadingMaxRetry: Infinity,
        xhrSetup: function (xhr) {
          xhr.addEventListener("error", (e) => {
            hls.loadSource(videoSrc.value);
            hls.startLoad();
            if (videoRef.value) {
              videoRef.value.play();
            }
          });
        },
      });

      hls.attachMedia(videoRef.value);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(videoSrc.value);
        hls.startLoad();
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        hls.recoverMediaError();
        if (data.type !== Hls.ErrorTypes.MEDIA_ERROR) {
          hls.startLoad();
        }
      });
      if (autoResume) {
        let prevEnd = 0;
        setInterval(() => {
          if (videoRef.value) {
            if (videoRef.value.seekable.length >= 1) {
              const currentEnd = videoRef.value.seekable.end(0);
              if (prevEnd === currentEnd) {
                hls.loadSource(videoSrc.value);
                hls.startLoad();
                if (videoRef.value) {
                  videoRef.value.play();
                }
              }
              prevEnd = currentEnd;
            }
          }
        }, resumeDelay);
      }
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
