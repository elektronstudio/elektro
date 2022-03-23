import { useBreakpoints } from "@vueuse/core";

export const breakpoints = useBreakpoints({
  medium: 600,
  large: 900,
  xlarge: 1440,
});

export const mobile = breakpoints.isSmaller("large");
export const desktop = breakpoints.isGreater("large");
