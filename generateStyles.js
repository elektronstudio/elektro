import config from "tailwindcss/defaultConfig.js";
import colors from "tailwindcss/colors.js";

const getVars = [
  ["spacing", "p"],
  ["fontSize", "text", (a) => a[0]],
  ["fontSize", "text", (a) => a[0]],
  ["fontSize", "line-height", (a) => a[1].lineHeight],
  ["gray", "gray"],
  ["borderWidth", "border"],
];

const source = { ...config.theme, ...colors };

const toVars = (key, name, acc = (a) => a) =>
  Object.entries(source[key])
    .map(([varKey, varValue]) => `  --${name}-${varKey}: ${acc(varValue)};`)
    .join("\n");

const vars = getVars.map((v) => toVars(...v)).join("\n");

const output = `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
${vars}
}`;

console.log(output);
