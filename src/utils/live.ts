import { onMounted, ref, watch } from "vue";
import { mobile, breakpoints } from ".";
// import liveData from "./public/liveData.json";
import { useStorage } from "@vueuse/core";

export type ContentType = "chat" | "text" | "image" | "video";

export type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
  order: number;
  contentType?: ContentType;
};

export const draggablesState = useStorage<Draggable[]>("draggable_state", []);
// Minimised draggables need separate state
// If they are filtered from the draggablesState, are not in correct order
// since draggablesState order never changes
// this is to reduce unnecessary rerenders and calculations
export const minimisedDraggables = useStorage<Draggable[]>(
  "minimised_draggable_state",
  [],
);

export function useLive(draggablesData: Draggable[]) {
  const updateDraggablesMobile = (draggable: Draggable) => {
    if (!draggable) {
      return;
    }
    const { draggableId } = draggable;

    // When minimising draggable
    if (draggable.isMinimised) {
      draggablesState.value = draggablesState.value.map((item) => {
        return {
          ...item,
          isMinimised: true,
        };
      });
      minimisedDraggables.value = [...minimisedDraggables.value, draggable];
    } else {
      // When maximising draggable
      draggablesState.value = draggablesState.value.map((item) => {
        return {
          ...item,
          // Minimise all other draggables
          isMinimised: item.draggableId === draggableId ? false : true,
        };
      });

      minimisedDraggables.value = draggablesState.value.filter(
        (item) => item.draggableId !== draggableId,
      );
    }

    return;
  };

  const updateDraggablesDesktop = (draggable: Draggable) => {
    if (!draggable) {
      return;
    }

    const { draggableId, order } = draggable;

    // Iterate through draggables and set the active draggable last in order
    draggablesState.value = draggablesState.value.map((item) => {
      if (item.draggableId === draggableId) {
        return { ...draggable, order: draggablesState.value.length };
      } else {
        return {
          ...item,
          order:
            // If other draggable was ahead in the order, decrement it
            item.order === 1
              ? 1
              : item.order > order
              ? item.order - 1
              : item.order,
        };
      }
    });

    if (draggable.isMinimised) {
      minimisedDraggables.value = [...minimisedDraggables.value, draggable];
    } else {
      minimisedDraggables.value = minimisedDraggables.value.filter(
        (item) => item.draggableId !== draggableId,
      );
    }
  };

  onMounted(() => {
    const initialStates = [] as Draggable[];

    draggablesData.forEach((draggable) => {
      const { draggableId } = draggable;
      const localDraggable = draggablesState.value?.find(
        (m: Draggable) => m.draggableId === draggableId,
      );
      const mergedDraggable = localDraggable
        ? {
            ...draggable,
            gridPosX: localDraggable.gridPosX,
            gridPosY: localDraggable.gridPosY,
            isMinimised: localDraggable.isMinimised,
          }
        : { ...draggable };

      if (mergedDraggable.order === undefined) {
        mergedDraggable.order = 1;
      }
      initialStates.push(mergedDraggable);
    });
    const minimised = initialStates.filter((item) => item.isMinimised);
    minimisedDraggables.value = minimised;
    draggablesState.value = initialStates;
  });

  return {
    updateDraggablesMobile,
    updateDraggablesDesktop,
  };
}
