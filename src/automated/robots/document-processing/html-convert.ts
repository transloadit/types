import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/html/convert

export const htmlConvertRobotSchema = z
  .object({
    robot: z.literal("/html/convert"),
    url: z.union([z.string(), z.null()]).nullable().default(null).optional()
      .describe(`The URL of the web page to be converted. Optional, as you can also
upload/import HTML files and pass it to this <dfn>Robot</dfn>.
`),
    format: z.enum(["pdf", "jpeg", "jpg", "png"]).default("png").optional()
      .describe(`The format of the resulting image. The supported values are
\`"pdf"\`, \`"jpg"\`, \`"jpeg"\` and \`"png"\`.
`),
    fullpage: z.boolean().default(true).optional()
      .describe(`Determines if a screenshot of the full page should be taken or not.

If set to \`true\`, the \`height\` parameter will not have any effect,
as heights of websites vary. You can control the size of the resulting
image somewhat, though, by setting the \`width\` parameter.

If set to \`false\`, an image will be cropped from the top of the webpage
according to your \`width\` and \`height\` parameters.
`),
    omit_background: z.boolean().default(false).optional()
      .describe(`Determines whether to preserve a transparent background in HTML pages.
Useful if you're generating artwork in HTML that you want to overlay on
e.g. a video.

The default of \`false\` fills transparent areas with a white background,
for easier reading/printing.

This parameter is only used when \`format\` is not \`pdf\`.
`),
    width: z.number().int().default(1024).optional()
      .describe(`The screen width that will be used, in pixels. Change this to change the
dimensions of the resulting image.
`),
    height: z.number().int().default(768).optional()
      .describe(`The screen height that will be used, in pixels. By default this equals the
length of the web page in pixels if \`fullpage\` is set to \`true\`. If
\`fullpage\` is set to \`false\`, the height parameter takes effect and
defaults to the value \`768\`.
`),
    delay: z.number().int().default(0).optional()
      .describe(`The delay (in milliseconds) applied to allow the page and all of its
JavaScript to render before taking the screenshot.
`),
    use: useSchema,
  })
  .describe(`takes screenshots of web pages or uploaded HTML pages`)

export type HtmlConvertRobot = z.infer<typeof htmlConvertRobotSchema>
