// TODO: convert to TS
// @ts-nocheck
export function timezoneShortname(date) {
  let dateString = date + "",
    tz =
      dateString.match(/\(([^\)]+)\)$/) ||
      dateString.match(/([A-Z]+) [\d]{4}$/);

  if (tz) {
    tz = tz[1].match(/[A-Z]/g).join("");
  }

  if (!tz && /(GMT\W*\d{4})/.test(dateString)) {
    return RegExp.$1;
  }

  return tz;
}
