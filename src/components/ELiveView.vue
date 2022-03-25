<script setup lang="ts">
import { breakpoints } from "../utils";
import { Draggable } from "../utils";
import EBreadBoard from "./EBreadBoard.vue";
import EDraggablesDock from "./EDraggablesDock.vue";
import EDraggableMobile from "./EDraggableMobile.vue";
import DraggableContent from "./DraggableContent.vue";
import EDraggable from "./EDraggable.vue";

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

console.log(draggablesState);
</script>

<template>
  <!-- <SmallDock :draggables="draggablesState" v-if="mobile" /> -->
  <EBreadBoard>
    <template v-if="mobile">
      <template
        v-for="draggable in draggablesState"
        :key="draggable.draggableId"
      >
        <EDraggableMobile
          :title="draggable.title"
          :draggable-id="draggable.draggableId"
          :tiles-width="draggable.tilesWidth"
          :tiles-height="draggable.tilesHeight"
          :grid-pos-x="draggable.gridPosX"
          :grid-pos-y="draggable.gridPosY"
          :is-minimised="draggable.isMinimised"
          :content-type="draggable.contentType"
          :order="draggable.order"
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
          :title="draggable.title"
          :draggable-id="draggable.draggableId"
          :tiles-width="draggable.tilesWidth"
          :tiles-height="draggable.tilesHeight"
          :grid-pos-x="draggable.gridPosX"
          :grid-pos-y="draggable.gridPosY"
          :is-minimised="draggable.isMinimised"
          :content-type="draggable.contentType"
          :order="draggable.order"
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
  </EBreadBoard>

  <EDraggablesDock
    v-if="mobile"
    :draggables="minimisedDraggables"
    @update-draggables="updateDraggablesMobile"
  />
  <EDraggablesDock
    v-else
    :draggables="minimisedDraggables"
    @update-draggables="updateDraggablesDesktop"
  />
</template>
