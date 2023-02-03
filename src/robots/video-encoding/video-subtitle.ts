import { z } from "zod"
import { ffmpegStackPresetFfmpegOverridesSchema } from "../shared/ffmpeg"
import { outputMetaSchema } from "../shared/output-meta"
import { useSchema } from "../shared/use"

// 🤖/video/subtitle

export const base = z
  .object({
    robot: z.literal("/video/subtitle"),
    subtitles_type: z.string().default("external").optional()
      .describe(`Determines if subtitles are added as a separate stream to the video (value \`"external"\`) that then can be switched on and off in your video player, or if they should be burned directly into the video (value \`"burn"\`) so that they become part of the video stream.
`),
    use: useSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`adds subtitles and closed captions to videos`)

export const videoSubtitleRobotSchema = base.and(ffmpegStackPresetFfmpegOverridesSchema)

export type VideoSubtitleRobot = z.infer<typeof videoSubtitleRobotSchema>
