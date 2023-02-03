import { z } from "zod"
import { useSchema } from "../shared/use"
import { ffmpegOptionsSchema, ffmpegStackSchema } from "../shared/ffmpeg"
import { outputMetaSchema } from "../shared/output-meta"

// 🤖/audio/concat

export const audioConcatRobotSchema = z
  .object({
    robot: z.literal("/audio/concat"),
    preset: z.string().default("mp3").optional()
      .describe(`Performs conversion using pre-configured settings.

If you specify your own FFmpeg parameters using the <dfn>Robot</dfn>'s
\`ffmpeg\` parameter and you have not specified a preset, then the default
\`mp3\` preset is not applied. This is to prevent you from having to
override each of the MP3 preset's values manually.

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
    audio_fade_seconds: z.number().default(1).optional()
      .describe(`When used this adds an audio fade in and out effect between each section
of your concatenated audio file. The float value is used, so if you want an
audio delay effect of 500 milliseconds between each video section, you
would select 0.5. Integer values can also be represented.

This parameter does not add an audio fade effect at the beginning or end
of your result audio file. If you want to do so, create an additional
[🤖/audio/encode](https://transloadit.com/docs/transcoding/audio-encoding/audio-encode/)
<dfn>Step</dfn> and use our \`ffmpeg\` parameter as shown in this
[demo](https://transloadit.com/demos/audio-encoding/ffmpeg-fade-in-and-out/).
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
    ffmpeg: ffmpegOptionsSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`concatenates several audio files together`)

export type AudioConcatRobot = z.infer<typeof audioConcatRobotSchema>
