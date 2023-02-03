import { z } from "zod"
import { use_schema } from "../shared/use"
import { imagemagick_stack_schema } from "../shared/imagemagick_stack"
import { output_meta_schema } from "../shared/output_meta"

// 🤖/image/resize

export const image_resize_robot_schema = z
  .object({
    robot: z.literal("/image/resize"),
    format: z.enum(["jpg", "png", "gif", "tiff"]).nullable().default(null).optional()
      .describe(`The output format for the modified image.

Some of the most important available formats are \`"jpg"\`, \`"png"\`,
\`"gif"\`, and \`"tiff"\`. For a complete lists of all formats that we
can write to please check [our supported image formats list](https://transloadit.com/docs/supported-formats/image-formats/).

If \`null\` (default), then the input image's format will be used as the
output format.

If you wish to convert to \`"pdf"\`, please consider
[🤖/document/convert](https://transloadit.com/docs/transcoding/document-processing/)
instead.
`),
    width: z.number().int().min(1).max(5000).optional()
      .describe(`Width of the new image, in pixels. If not specified, will default to the
width of the input image.
`),
    height: z.number().int().min(1).max(5000).optional()
      .describe(`Height of the new image, in pixels. If not specified, will default to the
height of the input image.
`),
    resize_strategy: z
      .enum(["fit", "fillcrop", "min_fit", "pad", "stretch", "crop"])
      .default("fit")
      .optional()
      .describe(`See the list of available [resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
    zoom: z.boolean().default(true).optional()
      .describe(`If this is set to \`false\`, smaller images will not be stretched to the
desired width and height. For details about the impact of zooming for your
preferred resize strategy, see the list of available [resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
    crop: z
      .union([z.record(z.string()), z.string()])
      .nullable()
      .default(null)
      .optional()
      .describe(`Specify an object containing coordinates for the top left and bottom right
corners of the rectangle to be cropped from the original image(s). The
coordinate system is rooted in the top left corner of the image. Values
can be integers for absolute pixel values or strings for percentage based
values.

For example:

\`\`\`json
{
  "x1": 80,
  "y1": 100,
  "x2": "60%",
  "y2": "80%"
}
\`\`\`

This will crop the area from \`(80, 100)\` to \`(600, 800)\` from a 1000×1000
pixels image, which is a square whose width is 520px and height is 700px.
If \`crop\` is set, the width and height parameters are ignored, and
the \`resize_strategy\` is set to \`crop\` automatically.

You can also use a
JSON string of such an object with coordinates in similar fashion:

\`\`\`json
"{\"x1\": <Integer>, \"y1\": <Integer>, \"x2\": <Integer>, \"y2\": <Integer>}"
\`\`\`

To crop around human faces, see
[🤖/image/facedetect](https://transloadit.com/docs/transcoding/artificial-intelligence/image-facedetect/).
`),
    gravity: z.enum(["center", "top", "bottom", "left", "right"]).default("center").optional()
      .describe(`The direction from which the image is to be cropped, when
\`"resize_strategy"\` is set to \`"crop"\`, but no crop coordinates
are defined. The available options are \`"center"\`, \`"top"\`,
\`"bottom"\`, \`"left"\`, and \`"right"\`. You can also combine options
with a hyphen, such as \`"bottom-right"\`.
`),
    strip: z.boolean().default(false).optional()
      .describe(`Strips all metadata from the image. This is useful to keep thumbnails as
small as possible.
`),
    alpha: z
      .enum([
        "Activate",
        "Background",
        "Copy",
        "Deactivate",
        "Extract",
        "Off",
        "On",
        "Opaque",
        "Remove",
        "Set",
        "Shape",
        "Transparent",
      ])
      .optional().describe(`Gives control of the alpha/matte channel of an image. Valid options are
\`"Activate"\`, \`"Background"\`, \`"Copy"\`, \`"Deactivate"\`, \`"Extract"\`,
\`"Off"\`, \`"On"\`, \`"Opaque"\`, \`"Remove"\`, \`"Set"\`, \`"Shape"\`,
\`"Transparent"\`.
`),
    preclip_alpha: z
      .enum([
        "Activate",
        "Background",
        "Copy",
        "Deactivate",
        "Extract",
        "Off",
        "On",
        "Opaque",
        "Remove",
        "Set",
        "Shape",
        "Transparent",
      ])
      .optional().describe(`Gives control of the alpha/matte channel of an image before applying the
clipping path via \`clip: true\`. Valid options are \`"Activate"\`,
\`"Background"\`, \`"Copy"\`, \`"Deactivate"\`, \`"Extract"\`, \`"Off"\`, \`"On"\`,
\`"Opaque"\`, \`"Remove"\`, \`"Set"\`, \`"Shape"\`, \`"Transparent"\`.
`),
    flatten: z.boolean().default(true).optional()
      .describe(`Flattens all layers onto the specified background to achieve better
results from transparent formats to non-transparent formats, as explained
in the [ImageMagick documentation](https://www.imagemagick.org/script/command-line-options.php?#layers).

To preserve animations, GIF files are not flattened when this is set to \`true\`.
To flatten GIF animations, use the \`frame\` parameter.
`),
    correct_gamma: z.boolean().default(false).optional()
      .describe(`Prevents gamma errors [common in many image scaling algorithms](https://www.4p8.com/eric.brasseur/gamma.html).
`),
    quality: z.number().int().min(1).max(100).optional()
      .describe(`Controls the image compression for JPG and PNG images. Please also take a look at [🤖/image/optimize](https://transloadit.com/docs/transcoding/image-manipulation/image-optimize/).
<br /> <strong>Before:</strong> <br />
<img src="%QUALITY_BEFORE%" />
<br /> <strong>Quality \`92\` applied:</strong> <br />
<img src="%QUALITY_92%" />
<br /> <strong>Quality \`40\` applied:</strong> <br />
<img src="%QUALITY_40%" />
<br /> If this parameter is not specified, it will default to the quality of the input image. If we're unable to determine the quality, it will default to \`92\`.
`),
    adaptive_filtering: z.boolean().default(false).optional()
      .describe(`Controls the image compression for PNG images. Setting to \`true\` results in smaller file size, while increasing processing time. It is encouraged to keep this option disabled.
`),
    background: z.string().default("#FFFFFF").optional().describe(`Either the hexadecimal code or
[name](https://www.imagemagick.org/script/color.php#color_names) of the
color used to fill the background (only used for the pad resize strategy).

By default, the background of transparent images is changed to white.
For details about how to preserve transparency across all image types,
see [this demo](https://transloadit.com/demos/image-manipulation/properly-preserve-transparency-across-all-image-types/).
`),
    frame: z.union([z.number().int(), z.null()]).nullable().default(null).optional()
      .describe(`Use this parameter when dealing with animated GIF files to specify which
frame of the GIF is used for the operation. Specify \`1\` to use the first
frame, \`2\` to use the second, and so on. \`null\` means all frames.
`),
    colorspace: z
      .enum([
        "CMY",
        "CMYK",
        "Gray",
        "HCL",
        "HCLp",
        "HSB",
        "HSI",
        "HSL",
        "HSV",
        "HWB",
        "Lab",
        "LCHab",
        "LCHuv",
        "LMS",
        "Log",
        "Luv",
        "OHTA",
        "Rec601YCbCr",
        "Rec709YCbCr",
        "RGB",
        "scRGB",
        "sRGB",
        "Transparent",
        "xyY",
        "XYZ",
        "YCbCr",
        "YCC",
        "YDbDr",
        "YIQ",
        "YPbPr",
        "YUV",
      ])
      .optional()
      .describe(`Sets the image colorspace. For details about the available values, see the
[ImageMagick documentation](https://www.imagemagick.org/script/command-line-options.php#colorspace).
Please note that if you were using \`"RGB"\`, we recommend using \`"sRGB"\`
instead as of 2014-02-04. ImageMagick might try to find the most efficient
\`colorspace\` based on the color of an image, and default to e.g. \`"Gray"\`.
To force colors, you might have to use this parameter in combination
with \`type: "TrueColor"\`.
`),
    type: z.string().default("").optional()
      .describe(`Sets the image color type. For details about the available values, see the
[ImageMagick documentation](https://www.imagemagick.org/script/command-line-options.php#type).
If you're using \`colorspace\`, ImageMagick might try to find the most
efficient based on the color of an image, and default to e.g. \`"Gray"\`. To
force colors, you could e.g. set this parameter to \`"TrueColor"\`
`),
    sepia: z
      .union([z.number().int().max(99), z.null()])
      .nullable()
      .default(null)
      .optional().describe(`Applies a sepia tone effect in percent.
`),
    rotation: z
      .union([
        z.union([
          z.literal(90),
          z.literal(180),
          z.literal(270),
          z.literal(360),
          z.literal(true),
          z.literal(false),
        ]),
        z.union([
          z.literal(90),
          z.literal(180),
          z.literal(270),
          z.literal(360),
          z.literal(true),
          z.literal(false),
        ]),
      ])
      .default(true)
      .optional()
      .describe(`Determines whether the image should be rotated. Use integers to specify the
rotation for each quarter revolution(\`90\`, \`180\`, \`270\`, \`360\`). Use the value
\`true\` to auto-rotate images that are rotated incorrectly or depend on EXIF
rotation settings. Otherwise, use \`false\` to disable auto-fixing altogether.
`),
    compress: z.union([z.string(), z.null()]).nullable().default(null).optional()
      .describe(`Specifies pixel compression for when the image is written. Valid values
are \`"None"\`, \`"BZip"\`, \`"Fax"\`, \`"Group4"\`, \`"JPEG"\`, \`"JPEG2000"\`,
\`"Lossless"\`, \`"LZW"\`, \`"RLE"\`, and \`"Zip"\`. Compression is disabled by
default.

Please also take a look at
[🤖/image/optimize](https://transloadit.com/docs/transcoding/image-manipulation/image-optimize/).
`),
    blur: z.union([z.string(), z.null()]).nullable().default(null).optional()
      .describe(`Specifies gaussian blur, using a value with the form \`{radius}x{sigma}\`.
The radius value specifies the size of area the operator should look at
when spreading pixels, and should typically be either \`"0"\` or at least
two times the sigma value. The sigma value is an approximation of how many
pixels the image is "spread"; think of it as the size of the brush used to
blur the image. This number is a floating point value, enabling small
values like \`"0.5"\` to be used.
`),
    text: z.array(z.record(z.string())).default([]).optional()
      .describe(`An array of objects each containing text rules. The following text
parameters are intended to be used as properties for your array of
text overlays. Here is an example:

\`\`\`json
"watermarked": {
  "use": "resized",
  "robot": "/image/resize",
  "imagemagick_stack": "v2.0.7",
  "text": [
    {
      "text": "© 2018 Transloadit.com",
      "size": 12,
      "font": "Ubuntu",
      "color": "#eeeeee",
      "valign": "bottom",
      "align": "right",
      "x_offset": 16,
      "y_offset": -10
    }
  ]
}
\`\`\`
<br /> <strong>Before:</strong> <br />
<img src="%TEXTMARK_BEFORE%" />
<br /> <strong>After:</strong> <br />
<img src="%TEXTMARK_AFTER%" />
`),
    progressive: z.boolean().default(false).optional()
      .describe(`Interlaces the image if set to \`true\`, which makes the image load
progressively in browsers. Instead of rendering the image from top to
bottom, the browser will first show a low-res blurry version of the images
which is then quickly replaced with the actual image as the data arrives.
This greatly increases the user experience, but comes at a cost of a file
size increase by around 10%.
`),
    transparent: z.string().default("").optional()
      .describe(`Make this color transparent within the image. Formats which support this
parameter include \`"GIF"\`, \`"PNG"\`, \`"BMP"\`, \`"TIFF"\`, \`"WebP"\`, and
\`"JP2"\`.
`),
    trim_whitespace: z.boolean().default(false).optional()
      .describe(`This determines if additional whitespace around the image should first be
trimmed away. If you set this to \`true\` this parameter removes any edges
that are exactly the same color as the corner pixels.
`),
    clip: z.union([z.boolean(), z.string()]).default(false).optional()
      .describe(`Apply the clipping path to other operations in the resize job, if one is
present. If set to \`true\`, it will automatically take the first clipping
path. If set to a String it finds a clipping path by that name.
`),
    negate: z.boolean().default(false).optional()
      .describe(`Replace each pixel with its complementary color, effectively negating the
image. Especially useful when testing clipping.
`),
    density: z.string().nullable().default(null).optional()
      .describe(`While in-memory quality and file format depth specifies the color
resolution, the density of an image is the spatial (space) resolution of
the image. That is the density (in pixels per inch) of an image and
defines how far apart (or how big) the individual pixels are. It defines
the size of the image in real world terms when displayed on devices or
printed.

You can set this value to a specific \`width\` or in the format
\`width\`x\`height\`.

If your converted image is unsharp, please try increasing density.
`),
    watermark_url: z.string().default("").optional()
      .describe(`A URL indicating a PNG image to be overlaid above this image. Please note that you can also  [supply the watermark via another Assembly Step](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#image-resize-supply-watermark-via-assembly-step). With watermarking you can add an image onto another image. This is usually used for logos.
<br /> <strong>Before:</strong> <br />
<img src="%IMAGEMARK_BEFORE%" />
<br /> <strong>After:</strong> <br />
<img src="%IMAGEMARK_AFTER%" />
`),
    watermark_position: z
      .union([
        z.enum([
          "center",
          "top",
          "bottom",
          "left",
          "right",
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ]),
        z.array(
          z.enum([
            "center",
            "top",
            "bottom",
            "left",
            "right",
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ])
        ),
      ])
      .default("center")
      .optional().describe(`The position at which the watermark is placed. The available options are
\`"center"\`, \`"top"\`, \`"bottom"\`, \`"left"\`, and \`"right"\`. You can also
combine options, such as \`"bottom-right"\`.

An array of possible values can also be specified, in which case one value
will be selected at random, such as \`[ "center", "left", "bottom-left",
"bottom-right" ]\`.

This setting puts the watermark in the specified corner. To use a specific
pixel offset for the watermark, you will need to add the padding to the
image itself.
`),
    watermark_x_offset: z.number().int().default(0).optional()
      .describe(`The x-offset in number of pixels at which the watermark will be placed in
relation to the position it has due to \`watermark_position\`.

Values can be both positive and negative and yield different results
depending on the \`watermark_position\` parameter. Positive values move the
watermark closer to the image's center point, whereas negative values move
the watermark further away from the image's center point.
`),
    watermark_y_offset: z.number().int().default(0).optional()
      .describe(`The y-offset in number of pixels at which the watermark will be placed in
relation to the position it has due to \`watermark_position\`.

Values can be both positive and negative and yield different results
depending on the \`watermark_position\` parameter. Positive values move the
watermark closer to the image's center point, whereas negative values move
the watermark further away from the image's center point.
`),
    watermark_size: z.string().default("").optional()
      .describe(`The size of the watermark, as a percentage.

For example, a value of \`"50%"\` means that size of the watermark will be
50% of the size of image on which it is placed. The exact sizing depends
on \`watermark_resize_strategy\`, too.
`),
    watermark_resize_strategy: z
      .enum(["fit", "min_fit", "stretch", "area"])
      .default("fit")
      .optional()
      .describe(`Available values are \`"fit"\`, \`"min_fit"\`, \`"stretch"\` and \`"area"\`.

To explain how the resize strategies work, let's assume our target image
size is 800×800 pixels and our watermark image is 400×300 pixels. Let's
also assume, the \`watermark_size\` parameter is set to \`"25%"\`.

For the \`"fit"\` resize strategy, the watermark is scaled so that the
longer side of the watermark takes up 25% of the corresponding image side.
And the other side is scaled according to the aspect ratio of the
watermark image. So with our watermark, the width is the longer side, and
25% of the image size would be 200px. Hence, the watermark would be
resized to 200×150 pixels. If the \`watermark_size\` was set to \`"50%"\`, it
would be resized to 400×300 pixels (so just left at its original size).

For the \`"min_fit"\` resize strategy, the watermark is scaled so that the
shorter side of the watermark takes up 25% of the corresponding image
side. And the other side is scaled according to the aspect ratio of the
watermark image. So with our watermark, the height is the shorter side,
and 25% of the image size would be 200px. Hence, the watermark would be
resized to 267×200 pixels. If the \`watermark_size\` was set to \`"50%"\`, it
would be resized to 533×400 pixels (so larger than its original size).

For the \`"stretch"\` resize strategy, the watermark is stretched (meaning,
it is resized without keeping its aspect ratio in mind) so that both sides
take up 25% of the corresponding image side. Since our image is 800×800
pixels, for a watermark size of 25% the watermark would be resized to
200×200 pixels. Its height would appear stretched, because keeping the
aspect ratio in mind it would be resized to 200×150 pixels instead.

For the \`"area"\` resize strategy, the watermark is resized (keeping its
aspect ratio in check) so that it covers \`"xx%"\` of the image's surface
area. The value from \`watermark_size\` is used for the percentage area
size.
`),
    "text.*.font": z.string().default("Arial").optional()
      .describe(`The font family to use. Also includes boldness and style of the font.

[Here](https://transloadit.com/docs/supported-formats/fonts/) is a list of all
supported fonts.
`),
    "text.*.size": z.number().int().default(12).optional().describe(`The text size in pixels.
`),
    "text.*.rotate": z.number().int().default(0).optional().describe(`The rotation angle in degrees.
`),
    "text.*.color": z.string().default("#000000").optional()
      .describe(`The text color. All hex colors in the form \`"#xxxxxx"\` are supported,
where each x can be \`0-9\` or \`a-f\`. \`"transparent"\` is also supported if
you want a transparent text color. In that case use "stroke" instead,
otherwise your text will not be visible.
`),
    "text.*.background_color": z.string().default("transparent").optional()
      .describe(`The text color. All hex colors in the form \`"#xxxxxx"\` are supported,
where each x is can be \`0-9\` or \`a-f\`. \`"transparent"\` is also supported.
`),
    "text.*.stroke_width": z.number().int().default(0).optional()
      .describe(`The stroke's width in pixels.
`),
    "text.*.stroke_color": z.string().default("transparent").optional()
      .describe(`The stroke's color. All hex colors in the form \`"#xxxxxx"\` are supported,
where each x is can be \`0-9\` or \`a-f\`. \`"transparent"\` is also supported.
`),
    "text.*.align": z.string().default("center").optional()
      .describe(`The horizontal text alignment. Can be \`"left"\`, \`"center"\` and \`"right"\`.
`),
    "text.*.valign": z.string().default("center").optional()
      .describe(`The vertical text alignment. Can be \`"top"\`, \`"center"\` and \`"bottom"\`.
`),
    "text.*.x_offset": z.number().int().default(0).optional()
      .describe(`The horizontal offset for the text in pixels that is added (positive
integer) or removed (negative integer) from the horizontal alignment.
`),
    "text.*.y_offset": z.number().int().default(0).optional()
      .describe(`The vertical offset for the text in pixels that is added (positive
integer) or removed (negative integer) from the vertical alignment.
`),
    use: use_schema,
    imagemagick_stack: imagemagick_stack_schema,
    output_meta: output_meta_schema,
  })
  .describe(
    `resizes, crops, changes colorization, rotation, and applies text and watermarks to images`
  )

export type ImageResizeRobot = z.infer<typeof image_resize_robot_schema>
