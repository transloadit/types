import { z } from "zod"
import { useSchema } from "../shared/use"
import { ffmpegStackSchema } from "../shared/ffmpeg_stack"
import { outputMetaSchema } from "../shared/output_meta"

// 🤖/audio/loop

export const audioLoopRobotSchema = z
  .object({
    robot: z.literal("/audio/loop"),
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
    duration: z.number().default(60).optional()
      .describe(`Target duration for the whole process in seconds. The <dfn>Robot</dfn>
will loop the input audio file for as long as this target duration is not
reached yet.
`),
    ffmpeg: z.record(z.string()).default({}).optional()
      .describe(`A parameter object to be passed to FFmpeg. If a preset is used, the
options specified are merged on top of the ones from the preset. For
available options, see the [FFmpeg documentation](https://ffmpeg.org/ffmpeg-doc.html). Options specified here
take precedence over the preset options.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`loops one audio file as often as is required to match a given duration`)

export type AudioLoopRobot = z.infer<typeof audioLoopRobotSchema>
