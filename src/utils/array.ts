export function uniqueCollection(arr: Record<string, any>, key: string) {
  const result = [];
  const map = new Map();
  for (const item of arr.reverse()) {
    if (!map.has(item[key])) {
      map.set(item[key], true);
      result.push(item);
    }
  }
  return result.reverse();
}
