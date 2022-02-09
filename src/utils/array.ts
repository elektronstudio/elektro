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

export function nearest(arr: number[], goal: number) {
  return arr.reduce((prev: number, curr: number) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev,
  );
}
