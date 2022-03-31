import { onMounted, onUnmounted, ref, Ref, watch } from "vue";
import { mobile } from "../utils";

export type ContentType = "chat" | "text" | "image" | "video" | "event";

export type Draggable = {
  draggableId: string;
  title?: string;
  gridPosX?: number;
  gridPosY?: number;
  tilesWidth?: number;
  tilesHeight?: number;
  isMinimised?: boolean;
  isMaximised?: boolean;
  isMaximisable?: boolean;
  order: number;
  contentType?: ContentType;
  data?: any;
};

export function useLive({
  data,
  draggablesState,
  minimisedDraggables,
}: {
  data: Draggable[];
  draggablesState: Ref<Draggable[]>;
  minimisedDraggables: Ref<Draggable[]>;
}) {
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

    const { draggableId, order, isMaximised } = draggable;

    // Iterate through draggables and set the active draggable top in order
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

    if (isMaximised) {
      minimisedDraggables.value = draggablesState.value.filter(
        (item) => item.draggableId !== draggableId,
      );
      draggablesState.value = draggablesState.value.map((item) =>
        item.draggableId === draggableId
          ? item
          : { ...item, isMinimised: true },
      );
    } else {
      minimisedDraggables.value = draggablesState.value.filter(
        (item) => item.isMinimised,
      );
    }

    // @TODO: Re-enable draggables dock order
    // This is to ensure that draggables are always in the correct order
    // if (draggable.isMinimised) {
    //   minimisedDraggables.value = [...minimisedDraggables.value, draggable];
    // } else {
    //   minimisedDraggables.value = minimisedDraggables.value.filter(
    //     (item) => item.draggableId !== draggableId,
    //   );
    // }
  };

  const handleResize = () => {
    if (
      mobile.value &&
      minimisedDraggables.value.length !== draggablesState.value.length - 1
    ) {
      draggablesState.value = draggablesState.value.map((item, index) => {
        return {
          ...item,
          isMinimised: index === 0 ? false : true,
        };
      });
      minimisedDraggables.value = draggablesState.value.filter(
        (item, index) => index !== 0,
      );
    }
  };

  const userActive = ref(true);
  const handleMouseMove = () => {
    userActive.value = true;
  };

  watch(userActive, () => {
    let timeOut;
    if (userActive.value) {
      timeOut = setTimeout(() => {
        userActive.value = false;
      }, 3000);
    } else {
      clearTimeout(timeOut);
    }
  });

  onMounted(() => {
    const initialStates = [] as Draggable[];

    data.forEach((draggable) => {
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

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
  });

  return {
    updateDraggablesMobile,
    updateDraggablesDesktop,
    userActive,
  };
}
