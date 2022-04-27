import { computed } from "vue";
import { differenceInMinutes, format, formatDistanceStrict } from "date-fns";
import { useNow } from "@vueuse/core";
import { sentenceCase } from "./string";
import { timezoneShortname } from "./timezone";
import { et } from "date-fns/locale";

const now = useNow({ interval: 1000 });
type Locale = "en" | "et" | string;

// @TODO: add formatRange()
export function formatDatetime(
  datetime: Date,
  showTime = true,
  locale: Locale = "en",
) {
  if (showTime) {
    // now is a reactive value but we do not expect timezone
    // to change over time so we only use the initial value
    return locale === "en"
      ? `${format(datetime, "d. MMMM y HH:mm")} ${timezoneShortname(now.value)}`
      : `${format(datetime, "dd. MMMM y 'kell' HH:mm", { locale: et })}`;
  } else {
    return format(datetime, "d. MMM y");
  }
}

// TODO: add useFormattedRangeDistance()
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

export const useRange = (
  fromDatetime: Date,
  toDatetime: Date,
  locale: Locale,
) => {
  const formattedFromDatetime = formatDatetime(fromDatetime, true, locale);
  const formattedToDatetime = formatDatetime(toDatetime, true, locale);
  const formattedDistance = useFormattedDistance(fromDatetime);
  const urgency = useRangeUrgency(fromDatetime, toDatetime);

  return {
    formattedFromDatetime,
    formattedToDatetime,
    formattedDistance,
    urgency,
  };
};
