import config from "tailwindcss/defaultConfig.js";

const getVars = [["spacing", "p"]];

const toVars = (key, name) =>
  Object.entries(config.theme[key])
    .map(([varKey, varValue]) => `  --${name}-${varKey}: ${varValue};`)
    .join("\n");

const vars = getVars.map((v) => toVars(...v)).join("\n");

console.log(`@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
${vars}
}`);
