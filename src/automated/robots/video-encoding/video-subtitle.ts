import { z } from "zod"
import { use_schema } from "../shared/use"
import { ffmpeg_stack_schema } from "../shared/ffmpeg_stack"
import { output_meta_schema } from "../shared/output_meta"

// 🤖/video/subtitle

export const video_subtitle_robot_schema = z
  .object({
    robot: z.literal("/video/subtitle"),
    preset: z.string().default("empty").optional()
      .describe(`Performs conversion using pre-configured settings. By default, no settings
are applied and the original settings of the video are preserved.

For a list of video presets, see [video presets](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).
`),
    subtitles_type: z.string().default("external").optional()
      .describe(`Determines if subtitles are added as a separate stream to the video (value \`"external"\`) that then can be switched on and off in your video player, or if they should be burned directly into the video (value \`"burn"\`) so that they become part of the video stream.
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
  .describe(`adds subtitles and closed captions to videos`)

export type VideoSubtitleRobot = z.infer<typeof video_subtitle_robot_schema>
