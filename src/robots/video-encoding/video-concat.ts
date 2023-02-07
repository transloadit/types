import { z } from "zod"
import { ffmpegStackPresetFfmpegOverridesSchema } from "../shared/ffmpeg.js"
import { outputMetaSchema } from "../shared/output-meta.js"
import { useSchema } from "../shared/use.js"

const base = z.object({
  robot: z.literal("/video/concat"),
  use: useSchema,
  output_meta: z.optional(outputMetaSchema),
  video_fade_seconds: z.optional(
    z.number().default(1.0)
      .describe(`When used this adds a video fade in and out effect between each section of your concatenated video. The float value is used so if you want a video delay effect of 500 milliseconds between each video section you would select \`0.5\`, however, integer values can also be represented.
    
This parameter does not add a video fade effect at the beginning or end of your video. If you want to do so, create an additional 🤖/video/encode Step and use our ffmpeg parameter as shown in this [demo](https://transloadit.com/demos/video-encoding/concatenate-fade-effect/).

Please note this parameter is independent of adding audio fades between sections.`)
  ),
  audio_fade_seconds: z.optional(
    z.number().default(1.0)
      .describe(`When used this adds an audio fade in and out effect between each section of your concatenated video. The float value is used so if you want a audio delay effect of 500 milliseconds between each video section you would select \`0.5\`, however, integer values can also be represented.

This parameter does not add an audio fade effect at the beginning or end of your video. If you want to do so, create an additional 🤖/video/encode Step and use our ffmpeg parameter as shown in this [demo](https://transloadit.com/demos/audio-encoding/ffmpeg-fade-in-and-out/).

Please note this parameter is independent of adding video fades between sections.`)
  ),
})

export const videoConcatRobotSchema = base.and(ffmpegStackPresetFfmpegOverridesSchema)

export type VideoConcatRobot = z.infer<typeof videoConcatRobotSchema>
