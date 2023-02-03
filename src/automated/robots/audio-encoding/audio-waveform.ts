import { z } from "zod"
import { use_schema } from "../shared/use"
import { output_meta_schema } from "../shared/output_meta"

// 🤖/audio/waveform

export const audio_waveform_robot_schema = z
  .object({
    robot: z.literal("/audio/waveform"),
    format: z.enum(["image", "json"]).default("image").optional()
      .describe(`The format of the result file. Can be \`"image"\` or \`"json"\`. If \`"image"\`
is supplied, a PNG image will be created, otherwise a JSON file.
`),
    width: z.number().int().default(256).optional()
      .describe(`The width of the resulting image if the format \`"image"\` was selected.
`),
    height: z.number().int().default(64).optional()
      .describe(`The height of the resulting image if the format \`"image"\` was selected.
`),
    background_color: z.string().default("00000000").optional()
      .describe(`The background color of the resulting image in the "rrggbbaa" format (red,
green, blue, alpha), if the format \`"image"\` was selected.
`),
    center_color: z.string().default("000000ff").optional()
      .describe(`The color used in the center of the gradient. The format is "rrggbbaa"
(red, green, blue, alpha).
`),
    outer_color: z.string().default("000000ff").optional()
      .describe(`The color used in the outer parts of the gradient. The format is
"rrggbbaa" (red, green, blue, alpha).
`),
    use: use_schema,
    output_meta: output_meta_schema,
  })
  .describe(
    `generates waveform images for your audio files and allows you to change their colors and dimensions`
  )

export type AudioWaveformRobot = z.infer<typeof audio_waveform_robot_schema>
