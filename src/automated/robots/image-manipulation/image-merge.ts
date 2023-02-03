import { z } from "zod"
import { useSchema } from "../shared/use"
import { outputMetaSchema } from "../shared/output_meta"

// 🤖/image/merge

export const imageMergeRobotSchema = z
  .object({
    robot: z.literal("/image/merge"),
    format: z.enum(["jpg", "png"]).default("png").optional()
      .describe(`The output format for the modified image.

The currently available formats are either \`"jpg"\` or \`"png"\`.
`),
    direction: z.enum(["vertical", "horizontal"]).optional()
      .describe(`Specifies the direction which the images are displayed.
Valid directions include \`"vertical"\` and \`"horizontal"\`.
`),
    border: z.number().int().min(1).max(10).optional()
      .describe(`An integer value which defines the gap between images on the spritesheet.

A value of \`"10"\` would have the furthest gap, while a value of \`"1"\` would place the images side-by-side.
`),
    background: z.string().default("#FFFFFF").optional()
      .describe(`Either the hexadecimal code or [name](https://www.imagemagick.org/script/color.php#color_names) of the color used to fill the background (only shown with a border > 1).

By default, the background of transparent images is changed to white.

For details about how to preserve transparency across all image types, see [this demo](https://transloadit.com/demos/image-manipulation/properly-preserve-transparency-across-all-image-types/).
`),
    adapative_filtering: z.boolean().default(false).optional()
      .describe(`Controls the image compression for PNG images. Setting to \`true\` results in smaller file size, while increasing processing time. It is encouraged to keep this option disabled.
`),
    quality: z.number().int().min(1).max(100).default(100).optional()
      .describe(`Controls the image compression for JPG and PNG images. Please also take a look at [🤖/image/optimize](https://transloadit.com/docs/transcoding/image-manipulation/image-optimize/).
<br /> <strong>Before:</strong> <br />
<img src="%QUALITY_BEFORE%" />
<br /> <strong>Quality \`92\` applied:</strong> <br />
<img src="%QUALITY_92%" />
<br /> <strong>Quality \`40\` applied:</strong> <br />
<img src="%QUALITY_40%" />
<br /> If this parameter is not specified, it will default to the quality of the input image. If we're unable to determine the quality, it will default to \`92\`.
`),
    use: useSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`merges several images into a single spritesheet.`)

export type ImageMergeRobot = z.infer<typeof imageMergeRobotSchema>
