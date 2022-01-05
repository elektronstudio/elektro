import { writeFile } from "fs/promises";

// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
import config from "tailwindcss/defaultConfig.js";

// https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
import colors from "tailwindcss/colors.js";

const getVars = [
  ["spacing", "p"],
  ["spacing", "gap"],
  ["fontSize", "text", (a) => a[0]],
  ["fontSize", "text", (a) => a[0]],
  ["fontSize", "line-height", (a) => a[1].lineHeight],
  ["fontWeight", "font"],
  ["fontWeight", "font"],
  ["letterSpacing", "tracking"],
  ["borderWidth", "border"],
  ["borderWidth", "border"],
  ["borderRadius", "rounded"],
  ["opacity", "opacity"],
  ["gray", "gray"],
];

const source = { ...config.theme, ...colors };

const toCssVars = (key, name, acc = (a) => a) =>
  Object.entries(source[key])
    .map(
      ([varKey, varValue]) =>
        `  --${name}-${varKey.replace(".", "\\.")}: ${acc(varValue)};`
    )
    .join("\n");

const cssVars = getVars.map((v) => toCssVars(...v)).join("\n");

const cssOutput = `
:root {
${cssVars}
}`;

const toJsonVars = (key, name, acc = (a) => a) => {
  return [
    name,
    Object.fromEntries(
      Object.entries(source[key]).map(([varKey, varValue]) => [
        `--${name}-${varKey.replace(".", "\\.")}`,
        acc(varValue),
      ])
    ),
  ];
};

const jsonVars = Object.fromEntries(getVars.map((v) => toJsonVars(...v)));

await writeFile("./src/vars.css", cssOutput);
await writeFile("./src/vars.json", JSON.stringify(jsonVars, null, 2));
