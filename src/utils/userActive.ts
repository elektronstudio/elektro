import { onMounted, onUnmounted, ref, watch } from "vue";

export const useUserActive = () => {
  const userActive = ref(false);
  const handleMouseMove = () => {
    console.log("mouse move");
    userActive.value = true;
  };

  watch(userActive, () => {
    let timeOut;
    if (userActive.value) {
      timeOut = setTimeout(() => {
        console.log("inactive");
        userActive.value = false;
      }, 3000);
    } else {
      clearTimeout(timeOut);
    }
  });

  onMounted(() => {
    window.addEventListener("mousemove", handleMouseMove);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  });

  return {
    userActive,
  };
};
