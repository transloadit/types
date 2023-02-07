import yaml from "js-yaml"
import fs from "node:fs/promises"

type Presets = {
  ffmpeg: {
    formats: {
      [format: string]: {
        [version in "v3.3.3" | "v4.3.1" | "v5.0.0"]: {
          description: string
          name: string
          muxing?: boolean
          demuxing?: boolean
        }
      }
    }
    codecs: {
      [codec: string]: {
        [version: string]: {
          description: string
          name: string
          medium: "video" | "audio"
          encoding?: boolean
          decoding?: boolean
        }
      }
    }
  }
  imagemagick: {
    formats: {
      [format: string]: {
        [version in "v2.0.7" | "v2.0.9"]: {
          description: string
          name: string
          native_blob?: boolean
          read?: boolean
          write?: boolean
          multiple?: boolean
        }
      }
    }
    fonts: {
      [font: string]: {
        [version in "v2.0.7" | "v2.0.9"]: {
          name: string
        }
      }
    }
  }
}

const presets = yaml.load(
  await fs.readFile("../content/_data_no11ty/generated_formats.yml", "utf8")
) as Presets

for (const software in presets) {
  const formats = presets[software]
  for (const format in formats) {
    console.log(format)
  }
}
