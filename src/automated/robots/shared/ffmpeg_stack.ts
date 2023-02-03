import { z } from "zod"

export const ffmpeg_stack_schema = z.string().default("v3.3.3").optional()
  .describe(`Selects the FFmpeg stack version to use for encoding.
These versions reflect real FFmpeg versions.

The current recommendation is to use \`"{{stacks.ffmpeg.recommended_version}}"\`.
Other valid values can be found [here](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).
`)
