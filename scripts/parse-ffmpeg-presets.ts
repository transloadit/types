import yaml from "js-yaml"
import fs from "node:fs/promises"

type Presets = {
  ffmpeg: {
    [version: string]: string[]
  }
}

const presets = yaml.load(
  await fs.readFile("../content/_data_no11ty/generated_presets.yml", "utf8")
) as Presets

const { ffmpeg } = presets

for (const stack in ffmpeg) {
  const presets = []
  for (const preset in ffmpeg[stack]) {
    presets.push(preset)
  }

  console.log(`export const ${stack.replace(/\./g, "_") + "_presets"} = ${JSON.stringify(presets)}`)
}
