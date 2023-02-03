import { z } from "zod"
import { use_schema } from "../shared/use"
import { ffmpeg_stack_schema } from "../shared/ffmpeg_stack"

// 🤖/video/adaptive

export const video_adaptive_robot_schema = z
  .object({
    robot: z.literal("/video/adaptive"),
    technique: z.enum(["dash", "hls"]).default("dash").optional()
      .describe(`Determines which streaming technique should be used. Currently supports
\`"dash"\` for MPEG-Dash and \`"hls"\` for HTTP Live Streaming.
`),
    playlist_name: z.string().default("playlist.mpd").optional()
      .describe(`The filename for the generated manifest/playlist file. The default is
\`"playlist.mpd"\` if your \`technique\` is \`"dash"\`, and \`"playlist.m3u8"\` if
your \`technique\` is \`"hls"\`.
`),
    segment_duration: z.number().int().default(10).optional()
      .describe(`The duration for each segment in seconds.
`),
    closed_captions: z.boolean().default(true).optional()
      .describe(`Determines whether you want closed caption support when using the \`"hls"\`
technique.
`),
    use: use_schema,
    ffmpeg_stack: ffmpeg_stack_schema,
  })
  .describe(
    `encodes videos into HTTP Live Streaming (HLS) and MPEG-Dash supported formats and generates the necessary manifest and playlist files`
  )

export type VideoAdaptiveRobot = z.infer<typeof video_adaptive_robot_schema>
