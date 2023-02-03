import { z } from "zod"
import { useSchema } from "../shared/use"
import { ffmpegOptionsSchema, ffmpegStackSchema } from "../shared/ffmpeg"
import { outputMetaSchema } from "../shared/output-meta"

// 🤖/audio/merge

export const audioMergeRobotSchema = z
  .object({
    robot: z.literal("/audio/merge"),
    preset: z.string().default("mp3").optional()
      .describe(`Performs conversion using pre-configured settings.

If you specify your own FFmpeg parameters using the <dfn>Robot</dfn>'s
\`ffmpeg\` parameter and you have not specified a preset, then the default
"mp3" preset is not applied. This is to prevent you from having to
override each of the mp3 preset's values manually.

For a list of audio presets, see [audio presets](https://transloadit.com/docs/transcoding/audio-encoding/audio-presets/).
`),
    bitrate: z.number().int().optional()
      .describe(`Bit rate of the resulting audio file, in bits per second. If not specified
will default to the bit rate of the input audio file.
`),
    sample_rate: z.number().int().optional()
      .describe(`Sample rate of the resulting audio file, in Hertz. If not specified will
default to the sample rate of the input audio file.
`),
    duration: z.string().default("longest").optional()
      .describe(`Duration of the output file compared to the duration of all merged audio
files. Can be \`"first"\` (duration of the first input file), \`"shortest"\`
(duration of the shortest audio file) or \`"longest"\` for the duration of
the longest input file.
`),
    loop: z.boolean().default(false).optional()
      .describe(`Specifies if any input files that do not match the target duration should
be looped to match it. Useful for audio merging where your overlay file is
typically much shorter than the main audio file.
`),
    volume: z.enum(["average", "sum"]).default("average").optional()
      .describe(`Valid values are \`"average"\` and \`"sum"\` here. \`"average"\` means each
input is scaled 1/n (n is the number of inputs) or \`"sum"\` which means
each individual audio stays on the same volume, but since we merge tracks
'on top' of each other, this could result in very loud output.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
    ffmpeg: ffmpegOptionsSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`overlays several audio files on top of each other`)

export type AudioMergeRobot = z.infer<typeof audioMergeRobotSchema>
