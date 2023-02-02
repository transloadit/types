import { z } from "zod"
import { ffmpeg_stack } from "../shared/ffmpeg-presets"
import { output_meta } from "../shared/output-meta"
import { useSchema } from "../shared/use"

const base = z.object({
  robot: z.literal("/video/concat"),
  use: useSchema,
  output_meta: z.optional(output_meta),
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

export const videoConcatRobotSchema = base.and(ffmpeg_stack)

export type VideoConcatRobot = z.infer<typeof videoConcatRobotSchema>

// const robot: VideoConcatRobot = {
//   robot: "/video/concat",
//   use: ":original",
//   ffmpeg_stack: "v3.3.3",
// todo: figure out VSCode autocompletion behavior here
// toggling autocompletion with an empty value `preset: ` gives correctly narrowed options for the current ffmpeg_stack
// while toggling autocompletion with an empty string value `preset: ''` gives all possible presets as options, disregarding the stack
//   preset: "hls-1080p",
//   ffmpeg: {
//     "-c:v": "libx264",
//     input_options: {
//       "-safe": "0",
//     },
//   },
// }
