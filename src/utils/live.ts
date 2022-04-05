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
  isAnchored?: boolean;
  order: number;
  contentType?: ContentType;
  data?: any;
  chatMessages?: number;
  hideTitleBarOnIdle?: boolean;
};

export function useLive({
  data,
  draggablesState,
}: {
  data: Draggable[];
  draggablesState: Ref<Draggable[]>;
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
    } else {
      // When maximising draggable
      draggablesState.value = draggablesState.value.map((item) => {
        return {
          ...item,
          // Minimise all other draggables
          isMinimised: item.draggableId === draggableId ? false : true,
        };
      });
    }

    return;
  };

  const updateDraggablesDesktop = (draggable: Draggable) => {
    if (!draggable) {
      return;
    }

    const { draggableId, order, isMaximised, isMinimised } = draggable;

    // Iterate through draggables and set the active draggable top in order
    if (isMinimised) {
      draggablesState.value = draggablesState.value.map((item) => {
        if (item.draggableId === draggableId) {
          return { ...draggable, order: 0 };
        } else {
          return {
            ...item,
            order: item.order + 1,
          };
        }
      });
    } else {
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
    }

    if (isMaximised) {
      draggablesState.value = draggablesState.value.map((item) =>
        item.draggableId === draggableId
          ? item
          : { ...item, isMinimised: true },
      );
    }
  };

  const handleResize = () => {
    if (mobile.value) {
      draggablesState.value = draggablesState.value.map((item, index) => {
        return {
          ...item,
          isMinimised: index === 0 ? false : true,
        };
      });
    }
  };

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
    draggablesState.value = initialStates;

    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    updateDraggablesMobile,
    updateDraggablesDesktop,
  };
}
