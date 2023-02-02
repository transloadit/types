import yaml from "js-yaml"
import fs from "node:fs/promises"

const presets = yaml.load(
  await fs.readFile("../content/_data_no11ty/generated_presets.yml", "utf8")
)

const { ffmpeg } = presets

let union = (...str) => `z.union([${str.join(", ")}])`
let literal = (str) => `z.literal("${str}")`

for (let stack in ffmpeg) {
  let presets = []
  for (let preset in ffmpeg[stack]) {
    presets.push(preset)
  }

  console.log(`export const ${stack.replace(/\./g, "_") + "_presets"} = ${JSON.stringify(presets)}`)
}
