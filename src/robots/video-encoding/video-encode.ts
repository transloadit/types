import { z } from "zod"
import { ffmpeg_stack } from "../shared/ffmpeg-presets"
import { output_meta } from "../shared/output-meta"
import { resize_strategy } from "../shared/resize_strategy"
import { useSchema } from "../shared/use"

const base = z.object({
  robot: z.literal("/video/encode"),
  use: useSchema,
  output_meta: output_meta.optional(),
  width: z.number().int().positive().min(1).max(1920).optional()
    .describe(`Width of the new video, in pixels.

If the value is not specified and the \`preset\` parameter is available, the preset's supplied width will be implemented.`),
  height: z.number().int().positive().min(1).max(1080).optional()
    .describe(`Height of the new video, in pixels.

If the value is not specified and the \`preset\` parameter is available, the preset's supplied height will be implemented.`),
  resize_strategy: resize_strategy.default("pad").optional(),
  zoom: z
    .boolean()
    .default(true)
    .optional()
    .describe(
      `If this is set to false, smaller videos will not be stretched to the desired width and height. For details about the impact of zooming for your preferred resize strategy, see the list of available [resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).`
    ),
  crop: z
    .union([
      z.object({
        x1: z.union([z.number().positive(), z.string()]),
        y1: z.union([z.number().positive(), z.string()]),
        x2: z.union([z.number().positive(), z.string()]),
        y2: z.union([z.number().positive(), z.string()]),
      }),
      z.string(),
    ])
    .nullable()
    .default(null)
    .optional()
    .describe(
      `Specify an object containing coordinates for the top left and bottom right corners of the rectangle to be cropped from the original video(s). Values can be integers for absolute pixel values or strings for percentage based values.

If crop is set, the \`width\` and \`height\` parameters are ignored, and the \`resize_strategy\` is set to \`crop\` automatically.`
    ),
  background: z
    .string()
    .default("00000000")
    .optional()
    .describe(
      `The background color of the resulting video the \`"rrggbbaa"\` format (red, green, blue, alpha) when used with the \`"pad"\` resize strategy. The default color is black.`
    ),
  rotate: z
    .union([
      z.literal(0),
      z.literal(90),
      z.literal(180),
      z.literal(270),
      z.literal(360),
      z.literal(false),
    ])
    .optional()
    .describe(`Forces the video to be rotated by the specified degree integer. Currently, only multiples of \`90\` are supported. We automatically correct the orientation of many videos when the orientation is provided by the camera. This option is only useful for videos requiring rotation because it was not detected by the camera. If you set \`rotate\` to \`false\` no rotation is performed, even if the metadata contains such instructions.
  
If left unspecified, the optimal default value will be automatically determined by an algorithm that may factor in input file properties and/or other given parameters.`),
  hint: z
    .boolean()
    .default(false)
    .optional()
    .describe(`Enables hinting for mp4 files, for RTP/RTSP streaming.`),
  turbo: z
    .boolean()
    .default(false)
    .optional()
    .describe(
      `Splits the video into multiple chunks so that each chunk can be encoded in parallel before all encoded chunks are stitched back together to form the result video. This comes at the expense of extra Priority Job Slots and may prove to be counter-productive for very small video files.`
    ),
  chunk_duration: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      `Allows you to specify the duration of each chunk when \`turbo\` is set to \`true\`. This means you can take advantage of that feature while using fewer Priority Job Slots. For instance, the longer each chunk is, the fewer Encoding Jobs will need to be used.

If left unspecified, the optimal default value will be automatically determined by an algorithm that may factor in input file properties and/or other given parameters.`
    ),
  freeze_detect: z
    .boolean()
    .default(false)
    .optional()
    .describe(
      `Examines the transcoding result file for video freeze frames and re-transcodes the video a second time if they are found. This is useful when you are using \`turbo: true\` because freeze frames can sometimes happen there. The re-transcode would then happen without turbo mode.    `
    ),
  watermark_url: z
    .string()
    .default("")
    .optional()
    .describe(`URL of the PNG image to be used as a watermark.`),
  watermark_position: z
    .enum(
      [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      z.array(
        z.union([
          z.literal("center"),
          z.literal("top"),
          z.literal("bottom"),
          z.literal("left"),
          z.literal("right"),
          z.literal("top-left"),
          z.literal("top-right"),
          z.literal("bottom-left"),
          z.literal("bottom-right"),
        ])
      )
    )
    .default("center")
    .optional()
    .describe(
      `Position of the watermark on the video. Possible values are \`"center"\`, \`"top"\`, \`"bottom"\`, \`"left"\`, \`"right"\`, \`"top-left"\`, \`"top-right"\`, \`"bottom-left"\`, \`"bottom-right"\`.`
    ),
})

export const videoEncodeRobotSchema = base.and(ffmpeg_stack)

export type VideoEncodeRobot = z.infer<typeof videoEncodeRobotSchema>
