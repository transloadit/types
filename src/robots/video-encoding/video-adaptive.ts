import * as z from "zod"
import { useSchema } from "../shared/use"

export const videoAdaptiveRobotSchema = z.object({
  robot: z.literal("/video/adaptive"),
  use: useSchema,
  technique: z.optional(
    z
      .union([z.literal("dash"), z.literal("hls")])
      .default("dash")
      .describe(
        'Determines which streaming technique should be used. Currently supports `"dash"` for MPEG-Dash and `"hls"` for HTTP Live Streaming.'
      )
  ),
  playlist_name: z.optional(
    z
      .string()
      .default("playlist.mpd")
      .describe(
        'The filename for the generated manifest/playlist file. The default is `"playlist.mpd"` if your `technique` is `"dash"`, and `"playlist.m3u8"` if your `technique` is `"hls"`.'
      )
  ),
  segment_duration: z.optional(
    z.number().int().positive().default(10).describe("The duration of each segment in seconds.")
  ),
  closed_captions: z.optional(
    z
      .boolean()
      .default(true)
      .describe(
        'Determines whether you want closed caption support when using the `"hls"` technique.'
      )
  ),
  ffmpeg_stack: z.optional(
    z.union([z.literal("v3.3.3"), z.literal("v4.3.1"), z.literal("v5.0.0")]).default("v3.3.3")
      .describe(`Selects the FFmpeg stack version to use for encoding. These versions reflect real FFmpeg versions. 
      
The current recommendation is to use \`"v4.3.1"\`. Other valid values can be found [here](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).`)
  ),
})
