import { nextTick, onMounted, onUnmounted, ref } from "vue";

export function useTextarea(callback = () => {}) {
  // TODO: What is the template refs naming convention?
  // textarea or textareaRef or textareaEl?
  const textarea = ref<HTMLInputElement | null>(null);
  // TODO: Naming convention for event handlers: e or event?
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      callback();
      if (textarea.value) {
        textarea.value.style.height = "auto";
      }
    }
  };

  const onInput = () => {
    if (textarea.value) {
      textarea.value.style.height = "auto";
      textarea.value.style.height = textarea.value.scrollHeight + "px";
    }
  };

  onMounted(() => {
    if (textarea.value) {
      textarea.value.addEventListener("keydown", onKeydown);
      textarea.value.addEventListener("input", onInput);
    }
  });

  onUnmounted(() => {
    if (textarea.value) {
      textarea.value.removeEventListener("keydown", onKeydown);
      textarea.value.removeEventListener("input", onInput);
    }
  });

  return textarea;
}

// TODO: Replace with https://vueuse.org/core/usemutationobserver ?

export async function scrollToBottom(scrollRef: HTMLElement | null) {
  if (!scrollRef) {
    return;
  }

  await nextTick();
  scrollRef.scrollTop = scrollRef.scrollHeight;
}
