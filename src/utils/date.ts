import { computed } from "vue";
import { differenceInMinutes, format, formatDistanceStrict } from "date-fns";
import { useNow } from "@vueuse/core";
import { sentenceCase } from "./string";
import { timezoneShortname } from "./timezone";

const now = useNow({ interval: 1000 });

// TODO: add formatDatetimeRange()
export function formatDatetime(datetime: Date, showTime = true) {
  if (showTime) {
    // now is a reactive value but we do not expect timezone
    // to change over time so we only use the initial value
    return `${format(datetime, "d. MMMM y HH:mm")} ${timezoneShortname(
      now.value,
    )}`;
  } else {
    return format(datetime, "d. MMM y");
  }
}

// TODO: add useRangeAgo()
const useFormattedDistance = (dateTime: Date) =>
  computed(() => {
    const distance = sentenceCase(
      formatDistanceStrict(dateTime, now.value, {
        roundingMethod: "ceil",
        addSuffix: true,
      }),
    );
    return distance;
  });

type Urgency = "past" | "now" | "soon" | "future";

function useRangeUrgency(fromDateTime: Date, toDateTime: Date) {
  return computed<Urgency>(() => {
    // TODO: Make soonMinutes into a configurable value
    const soonMinutes = 3 * 60;
    const started = differenceInMinutes(fromDateTime, now.value);
    const ended = differenceInMinutes(toDateTime, now.value);
    if (started < 0 && ended >= 0) {
      return "now";
    } else if (started >= 0 && started <= soonMinutes) {
      return "soon";
    } else if (started >= 0 && started > soonMinutes) {
      return "future";
    } else {
      return "past";
    }
  });
}

export const useRange = (fromDatetime: Date, toDatetime: Date) => {
  const formattedFromDatetime = formatDatetime(fromDatetime);
  const formattedToDatetime = formatDatetime(toDatetime);
  const formattedDistance = useFormattedDistance(fromDatetime);
  const urgency = useRangeUrgency(fromDatetime, toDatetime);

  return {
    formattedFromDatetime,
    formattedToDatetime,
    formattedDistance,
    urgency,
  };
};
