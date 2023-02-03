import { z } from "zod"
import { use_schema } from "../shared/use"
import { imagemagick_stack_schema } from "../shared/imagemagick_stack"

// 🤖/document/thumbs

export const document_thumbs_robot_schema = z
  .object({
    robot: z.literal("/document/thumbs"),
    page: z.union([z.number().int(), z.null()]).nullable().default(null).optional()
      .describe(`The PDF page that you want to convert to an image. By default the value
is \`null\` which means that all pages will be converted into images.
`),
    format: z.enum(["jpeg", "jpg", "gif", "png"]).default("png").optional()
      .describe(`The format of the extracted image(s). Supported values are \`"jpeg"\`,
\`"jpg"\`, \`"gif"\` and \`"png"\`.

If you specify the value \`"gif"\`, then an animated gif cycling through
all pages is created. Please check out [this demo](https://transloadit.com/demos/document-processing/convert-all-pages-of-a-document-into-an-animated-gif/)
to learn more about this.
`),
    delay: z.union([z.number().int(), z.null()]).nullable().default(null).optional()
      .describe(`If your output format is \`"gif"\` then this parameter sets the number of
100th seconds to pass before the next frame is shown in the animation. Set
this to \`100\` for example to allow 1 second to pass between the frames of
the animated gif.

If your output format is not \`"gif"\`, then this
parameter does not have any effect.
`),
    width: z.number().int().min(1).max(5000).optional()
      .describe(`Width of the new image, in pixels. If not specified, will default to the
width of the input image
`),
    height: z.number().int().min(1).max(5000).optional()
      .describe(`Height of the new image, in pixels. If not specified, will default to the
height of the input image
`),
    resize_strategy: z
      .enum(["fit", "fillcrop", "min_fit", "pad", "stretch", "crop"])
      .default("pad")
      .optional()
      .describe(`One of the [available resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
    background: z.string().default("#FFFFFF").optional().describe(`Either the hexadecimal code or
[name](https://www.imagemagick.org/script/color.php#color_names) of the
color used to fill the background (only used for the pad resize strategy).

By default, the background of transparent images is changed to white.
For details about how to preserve transparency across all image types, see
[this demo](https://transloadit.com/demos/image-manipulation/properly-preserve-transparency-across-all-image-types/).
`),
    alpha: z.string().default("").optional()
      .describe(`Change how the alpha channel of the resulting image should work. Valid
values are \`"Set"\` to enable transparency and \`"Remove"\` to remove
transparency.

For a list of all valid values please check the ImageMagick documentation
[here](http://www.imagemagick.org/script/command-line-options.php?#alpha).
`),
    density: z.union([z.string(), z.null()]).nullable().default(null).optional()
      .describe(`While in-memory quality and file format depth specifies the color
resolution, the density of an image is the spatial (space) resolution of
the image. That is the density (in pixels per inch) of an image and
defines how far apart (or how big) the individual pixels are. It defines
the size of the image in real world terms when displayed on devices or
printed.

You can set this value to a specific \`width\` or in the format
\`width\`x\`height\`.

If your converted image has a low resolution, please try using the density
parameter to resolve that.
`),
    colorspace: z.string().default("").optional()
      .describe(`Sets the image colorspace. For details about the available values, see the
[ImageMagick documentation](https://www.imagemagick.org/script/command-line-options.php#colorspace).

Please note that if you were using \`"RGB"\`, we recommend using \`"sRGB"\`.
ImageMagick might try to find the most efficient \`colorspace\` based on the
color of an image, and default to e.g. \`"Gray"\`. To force colors, you
might then have to use this parameter.
`),
    trim_whitespace: z.boolean().default(true).optional()
      .describe(`This determines if additional whitespace around the PDF should first be
trimmed away before it is converted to an image. If you set this to \`true\`
only the real PDF page contents will be shown in the image.

If you need to reflect the PDF's dimensions in your image, it is generally
a good idea to set this to \`false\`.
`),
    pdf_use_cropbox: z.boolean().default(true).optional()
      .describe(`Some PDF documents lie about their dimensions. For instance they'll say
they are landscape, but when opened in decent Desktop readers, it's really
in portrait mode. This can happen if the document has a cropbox defined.
When this option is enabled (by default), the cropbox is leading in
determining the dimensions of the resulting thumbnails.
`),
    output_meta: z
      .union([z.record(z.string()), z.boolean()])
      .default({})
      .optional()
      .describe(`Generally, this parameter allows you to specify a set of metadata that is
more expensive on cpu power to calculate, and thus is disabled by default
to keep your Assemblies processing fast.

This Robot only supports the default value of \`{}\` (meaning all meta data
will be extracted) and \`false\`. A value of \`false\` means that only width,
height, size and thumb_index will be extracted for the result images,
which would also provide a great performance boost for documents with many
pages.
`),
    use: use_schema,
    imagemagick_stack: imagemagick_stack_schema,
  })
  .describe(
    `generates an image for each page in a PDF file or an animated gif file that loops through all pages`
  )

export type DocumentThumbsRobot = z.infer<typeof document_thumbs_robot_schema>
