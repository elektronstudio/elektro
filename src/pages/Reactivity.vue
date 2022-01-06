<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useMouse } from "@vueuse/core";
import ETitle from "../components/ETitle.vue";

// Constant
const a = 10;

// Destructured props with a default value
const { b = 10 } = defineProps<{ b?: number }>();

// Reactive primitive value in ref.
// Access it as c.value in script
// Access it as c in template
const c = ref(0);

// Reactive object in ref
const d = ref({ something: 0 });

// Reactive object in reactive function.
// See https://dev.to/ycmjason/thought-on-vue-3-composition-api-reactive-considered-harmful-j8c
// const e = reactive({e: 0});

// Computed value
const e = computed(() => `"c must be ${c.value} I guess"`);

// Imported hook, returns x and y as separate refs
const { x, y } = useMouse();

// Watching a single ref
watch(c, () => console.log(c.value), { immediate: true });

// Watching multiple refs, see the console
// watch([x, y], () => console.log(x.value, y.value), { immediate: true });

// Emitting events up to  the parent
const emit =
  defineEmits<(e: "mouse", payload: { x: number; y: number }) => number>();

// Click event handler
const onClick = () => emit("mouse", { x: x.value, y: y.value });

// Refer a DOM element
const z = <Ref<HTMLCanvasElement | null>>ref(null);

// You will need to make sure it is available defore accessing it

onMounted(() => {
  const ctx = z.value?.getContext("2d");
  if (ctx) {
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }
});
</script>

<template>
  <ETitle size="lg">Reactivity test</ETitle>
  <pre>
constant a: {{ a }}
prop b: {{ b }}
ref c: {{ c }} // No .value needed!
ref d: {{ d }}
computed e: {{ e }}
  </pre>
  <input type="range" v-model.number="c" />
  <p />
  <button @click="onClick">Emit x: {{ x }} y: {{ x }}</button>
  <p />
  <canvas ref="z" />
</template>
