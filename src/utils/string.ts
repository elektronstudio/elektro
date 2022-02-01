import { shuffle } from "./array";

export default function randomString(length = 36): string {
  return [...Array(length)]
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
}

export const randomId = (length = 16) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return shuffle(letters).slice(0, length).join("");
};

export const safeJsonParse = (str: any) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};
