//@ts-check
import { ref, onMounted, onUnmounted } from "vue";

export const useMouse = () => {
  const mouseX = ref<number | null>(null);
  const mouseY = ref<number | null>(null);

  const updateMouse = (e: MouseEvent) => {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
  };

  const updateTouch = (e: TouchEvent) => {
    if (e.changedTouches) {
      mouseX.value = e.changedTouches[0].clientX;
    }

    if (e.changedTouches) {
      mouseY.value = e.changedTouches[0].clientY;
    }
  };

  onMounted(() => {
    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("touchmove", updateTouch);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", updateMouse);
    window.removeEventListener("touchmove", updateTouch);
  });

  return { mouseX, mouseY };
};
