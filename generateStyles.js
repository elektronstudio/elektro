import config from "tailwindcss/defaultConfig.js";

const getVars = [
  ["spacing", "p"],
  ["fontSize", "text", (a) => a[0]],
  ["fontSize", "text", (a) => `${a[0]}/${a[1].lineHeight}`],
];

const toVars = (key, name, acc = (a) => a) =>
  Object.entries(config.theme[key])
    .map(([varKey, varValue]) => `  --${name}-${varKey}: ${acc(varValue)};`)
    .join("\n");

const vars = getVars.map((v) => toVars(...v)).join("\n");

console.log(`@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
${vars}
}`);
