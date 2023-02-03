import { z } from "zod"
import { use_schema } from "../shared/use"
import { ffmpeg_stack_schema } from "../shared/ffmpeg_stack"
import { output_meta_schema } from "../shared/output_meta"

// 🤖/video/concat

export const video_concat_robot_schema = z
  .object({
    robot: z.literal("/video/concat"),
    preset: z.string().default("flash").optional()
      .describe(`Performs conversion using pre-configured settings.

If you specify your own FFmpeg parameters using the <dfn>Robot</dfn>'s
\`ffmpeg\` parameter and you have not specified a preset, then the default
\`"flash"\` preset is not applied. This is to prevent you from having to
override each of the flash preset's values manually.

For a list of video presets, see [video presets](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).
`),
    video_fade_seconds: z.number().default(1).optional()
      .describe(`When used this adds a video fade in and out effect between each section of
your concatenated video. The float value is used so if you want a video
delay effect of 500 milliseconds between each video section you would
select \`0.5\`, however, integer values can also be represented.

This parameter does not add a video fade effect at the beginning or end of
your video. If you want to do so, create an additional
[🤖/video/encode](https://transloadit.com/docs/transcoding/video-encoding/video-presets/) Step and
use our \`ffmpeg\` parameter as shown in this
[demo](https://transloadit.com/demos/video-encoding/concatenate-fade-effect/).

Please note this parameter is independent of adding audio fades between
sections.
`),
    audio_fade_seconds: z.number().default(1).optional()
      .describe(`When used this adds an audio fade in and out effect between each section
of your concatenated video. The float value is used so if you want an
audio delay effect of 500 milliseconds between each video section you
would select \`0.5\`, however, integer values can also be represented.

This parameter does not add an audio fade effect at the beginning or end
of your video. If you want to do so, create an additional
[🤖/video/encode](https://transloadit.com/docs/transcoding/video-encoding/video-presets/) Step and
use our \`ffmpeg\` parameter as shown in this
[demo](https://transloadit.com/demos/audio-encoding/ffmpeg-fade-in-and-out/).

Please note this parameter is independent of adding video fades between
sections.
`),
    ffmpeg: z.record(z.string()).default({}).optional()
      .describe(`A parameter object to be passed to FFmpeg. If a preset is used, the
options specified are merged on top of the ones from the preset. For
available options, see the [FFmpeg documentation](https://ffmpeg.org/ffmpeg-doc.html). Options specified here
take precedence over the preset options.
`),
    use: use_schema,
    ffmpeg_stack: ffmpeg_stack_schema,
    output_meta: output_meta_schema,
  })
  .describe(`concatenates several videos together`)

export type VideoConcatRobot = z.infer<typeof video_concat_robot_schema>
