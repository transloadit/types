import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/image/optimize

export const imageOptimizeRobotSchema = z
  .object({
    robot: z.literal("/image/optimize"),
    priority: z
      .enum(["compression-ratio", "conversion-speed"])
      .default("compression-ratio")
      .optional().describe(`Provides different algorithms for better or worse compression for your
images, but that run slower or faster. Valid values are
\`"compression-ratio"\` and \`"conversion-speed"\`. The value
\`"conversion-speed"\` will result in an average compression ratio of 18%.
\`"compression-ratio"\` will result in an average compression ratio of 31%.
`),
    progressive: z.boolean().default(false).optional()
      .describe(`Interlaces the image if set to \`true\`, which makes the result image load
progressively in browsers. Instead of rendering the image from top to
bottom, the browser will first show a low-res blurry version of the image
which is then quickly replaced with the actual image as the data arrives.
This greatly increases the user experience, but comes at a loss of about
10% of the file size reduction.
`),
    preserve_meta_data: z.boolean().default(true).optional()
      .describe(`Specifies if the image's metadata should be preserved during the
optimization, or not. If it is not preserved, the file size is even
further reduced. But be aware that this could strip a photographer's
copyright information, which for obvious reasons can be frowned upon.
`),
    fix_breaking_images: z.boolean().default(true).optional()
      .describe(`If set to \`true\` this parameter tries to fix images that would otherwise
make the underlying tool error out and thereby break your
<dfn>Assemblies</dfn>. This can sometimes result in a larger file size,
though.
`),
    use: useSchema,
  })
  .describe(`reduces the size of images while maintaining the same visual quality`)

export type ImageOptimizeRobot = z.infer<typeof imageOptimizeRobotSchema>
