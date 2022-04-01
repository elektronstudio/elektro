<script setup lang="ts">
import { Draggable, breakpoints } from "../utils";
import { useIdle } from "@vueuse/core";
import { computed } from "vue";
import EBreadBoard from "./EBreadBoard.vue";
import EDraggablesDock from "./EDraggablesDock.vue";
import EDraggableMobile from "./EDraggableMobile.vue";
import DraggableContent from "./DraggableContent.vue";
import EDraggable from "./EDraggable.vue";
import EButton from "./EButton.vue";

type Props = {
  draggablesState: Draggable[];
  minimisedDraggables: Draggable[];
  updateDraggablesDesktop: (draggable: Draggable) => void;
  updateDraggablesMobile: (draggable: Draggable) => void;
};

const mobile = breakpoints.smaller("large");
const {
  draggablesState,
  minimisedDraggables,
  updateDraggablesDesktop,
  updateDraggablesMobile,
} = defineProps<Props>();

const draggableMaximised = computed(
  () => !!draggablesState.find((draggable) => draggable.isMaximised),
);
const { idle } = useIdle(3000); // 3 seconds idle
</script>

<template>
  <!-- <SmallDock :draggables="draggablesState" v-if="mobile" /> -->
  <EBreadBoard>
    <EButton
      class="backToEvent"
      :class="{ idle: idle }"
      size="xs"
      color="transparent"
      el="a"
    >
      <!-- @TODO: Implement proper icon system to Elektro -->
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      Back to event
    </EButton>
    <template v-if="mobile">
      <template
        v-for="draggable in draggablesState"
        :key="draggable.draggableId"
      >
        <EDraggableMobile
          :draggable="draggable"
          @update-draggables="updateDraggablesMobile"
        >
          <DraggableContent
            v-if="draggable.contentType"
            :content-type="draggable.contentType"
            :data="draggable.data"
          />
        </EDraggableMobile>
      </template>
    </template>
    <template v-else>
      <template
        v-for="draggable in draggablesState"
        :key="draggable.draggableId"
      >
        <EDraggable
          :draggable="draggable"
          @update-draggables="updateDraggablesDesktop"
        >
          <DraggableContent
            v-if="draggable.contentType"
            :content-type="draggable.contentType"
            :data="draggable.data"
          />
        </EDraggable>
      </template>
    </template>

    <EDraggablesDock
      v-if="mobile"
      :user-active="idle"
      :draggable-maximised="draggableMaximised"
      :draggables="minimisedDraggables"
      @update-draggables="updateDraggablesMobile"
    />
    <EDraggablesDock
      v-else
      :user-active="idle"
      :draggable-maximised="draggableMaximised"
      :draggables="minimisedDraggables"
      @update-draggables="updateDraggablesDesktop"
    />
  </EBreadBoard>
</template>

<style scoped>
.backToEvent {
  z-index: 1000;
}
@media only screen and (max-width: 899px) {
  .backToEvent {
    width: 100%;
    height: var(--h-6);
    background-color: var(--bg);
    border-bottom: 1px solid var(--gray-500);
  }
}
@media only screen and (min-width: 900px) {
  .backToEvent {
    position: fixed;
    top: var(--p-2);
    left: var(--p-2);
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  .backToEvent.idle {
    opacity: 0;
  }
}
</style>
