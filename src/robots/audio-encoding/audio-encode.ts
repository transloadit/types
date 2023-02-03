import { z } from "zod"
import { useSchema } from "../shared/use"
import { ffmpegStackSchema } from "../shared/ffmpeg"
import { outputMetaSchema } from "../shared/output-meta"
import { ffmpegOptionsSchema } from "../shared/ffmpeg"

// 🤖/audio/encode

export const audioEncodeRobotSchema = z
  .object({
    robot: z.literal("/audio/encode"),
    preset: z.string().default("mp3").optional()
      .describe(`Performs conversion using pre-configured settings.

If you specify your own FFmpeg parameters using the <dfn>Robot</dfn>'s
\`ffmpeg\` parameter and you have not specified a preset, then the default
\`mp3\` preset is not applied. This is to prevent you from having to
override each of the \`mp3\` preset's values manually.

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
    segment: z.boolean().default(false).optional()
      .describe(`Splits the file into multiple parts, to be used for Apple's [HTTP Live Streaming](https://developer.apple.com/resources/http-streaming/).
`),
    segment_duration: z.number().int().default(10).optional()
      .describe(`Specifies the length of each HTTP segment. This is optional, and the
default value as recommended by Apple is \`10\`. Do not change this value
unless you have a good reason.
`),
    segment_prefix: z.string().optional()
      .describe(`The prefix used for segment output files. For example, a prefix of
\`"segment_"\` would produce files named \`"segment_0.ts"\`, \`"segment_1.ts"\`,
and so on. This is optional, and defaults to the base name of the input
file.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
    ffmpeg: ffmpegOptionsSchema,
    output_meta: outputMetaSchema,
  })
  .describe(
    `converts audio files into all kinds of formats for you. We provide encoding presets for the most common formats`
  )

export type AudioEncodeRobot = z.infer<typeof audioEncodeRobotSchema>
