import { z } from "zod"
import { ffmpegStackSchema } from "../shared/ffmpeg.js"
import { outputMetaSchema } from "../shared/output-meta.js"
import { useSchema } from "../shared/use.js"

// 🤖/video/thumbs

export const videoThumbsRobotSchema = z
  .object({
    robot: z.literal("/video/thumbs"),
    count: z.number().int().min(1).max(999).default(8).optional()
      .describe(`The number of thumbnails to be extracted. As some videos have incorrect
durations, the actual number of thumbnails generated may be less in rare
cases. The maximum number of thumbnails we currently allow is 999.
`),
    offsets: z
      .union([z.array(z.number().int()), z.array(z.string())])
      .default([])
      .optional()
      .describe(`An array of offsets representing seconds of the file duration, such as \`[
2, 45, 120 ]\`. Millisecond durations of a file can also be used by using
decimal place values.  For example, an offset from 1250 milliseconds would
be represented with \`1.25\`. Offsets can also be percentage values such as
\`[ "2%", "50%", "75%" ]\`.

This option cannot be used with the \`count\`
parameter, and takes precedence if both are specified. Out-of-range
offsets are silently ignored.
`),
    format: z.enum(["jpeg", "jpg", "png"]).default("jpeg").optional()
      .describe(`The format of the extracted thumbnail. Supported values are \`"jpg"\`,
\`"jpeg"\` and \`"png"\`. Even if you specify the format to be \`"jpeg"\` the
resulting thumbnails will have a \`"jpg"\` file extension.
`),
    width: z.number().int().min(1).max(1920).optional()
      .describe(`The width of the thumbnail, in pixels.
`),
    height: z.number().int().min(1).max(1080).optional()
      .describe(`The height of the thumbnail, in pixels.
`),
    resize_strategy: z
      .enum(["fit", "fillcrop", "min_fit", "pad", "stretch", "crop"])
      .default("pad")
      .optional()
      .describe(`One of the [available resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
    background: z.string().default("00000000").optional()
      .describe(`The background color of the resulting thumbnails in the \`"rrggbbaa"\` format
(red, green, blue, alpha) when used with the \`"pad"\` resize strategy. The
default color is black.
`),
    rotate: z.number().int().optional()
      .describe(`Forces the video to be rotated by the specified degree integer. Currently,
only multiples of 90 are supported. We automatically correct the
orientation of many videos when the orientation is provided by the camera.
This option is only useful for videos requiring rotation because it was
not detected by the camera.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`extracts any number of images from videos for use as previews`)

export type VideoThumbsRobot = z.infer<typeof videoThumbsRobotSchema>
