export function randomString(length = 36): string {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
}

export function safeJsonParse(str: any) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
}
