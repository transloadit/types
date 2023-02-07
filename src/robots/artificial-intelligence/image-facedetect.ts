import { z } from "zod"
import { useSchema } from "../shared/use.js"

// 🤖/image/facedetect

export const imageFacedetectRobotSchema = z
  .object({
    robot: z.literal("/image/facedetect"),
    crop: z.boolean().default(false).optional()
      .describe(`Determine if the detected faces should be extracted. If this option is set
to \`false\`, then the <dfn>Robot</dfn> returns the input image again, but
with the coordinates of all detected faces attached to \`file.meta.faces\` in
the result JSON. If this parameter is set to \`true\`, the <dfn>Robot</dfn>
will output all detected faces as images.
`),
    crop_padding: z.string().default("5px").optional()
      .describe(`Specifies how much padding is added to the extracted face images if \`crop\`
is set to \`true\`. Values can be in \`px\` (pixels) or \`%\` (percentage of the
width and height of the particular face image).
`),
    format: z.enum(["preserve", "jpg", "png", "tiff"]).default("preserve").optional()
      .describe(`Determines the output format of the extracted face images if \`crop\` is set
to \`true\`.

The default value \`"preserve"\` means that the input image
format is re-used. Valid values are \`"jpg"\`, \`"png"\`, \`"tiff"\` and
\`"preserve"\`.
`),
    min_confidence: z.number().int().max(100).default(70).optional()
      .describe(`Specifies the minimum confidence that a detected face must have. Only
faces which have a higher confidence value than this threshold will be
included in the result.
`),
    faces: z
      .union([
        z.enum(["each", "max-confidence", "max-size", "group"]),
        z.enum(["each", "max-confidence", "max-size", "group"]),
      ])
      .default("each")
      .optional().describe(`Determines which of the detected faces should be returned. Valid values
are:

- \`"each"\` — each face is returned individually.
- \`"max-confidence"\` — only the face with the highest confidence value is
returned.
- \`"max-size"\` — only the face with the largest area is
returned.
- \`"group"\` — all detected faces are grouped together into
one rectangle that contains all faces.
- any integer — the faces are sorted by their top-left corner and
the integer determines the index of
the returned face. Be aware the values are zero-indexed, meaning that
\`faces: 0\` will return the first face. If no face for a given index
exists, no output is produced.

For the following examples,
the input image is:

![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-unsplash.jpg)

<br>

\`faces: "each"\` applied:

![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-face-0.jpg)
![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-face-1.jpg)

<br>

\`faces: "max-confidence"\` applied:

![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-face-1.jpg)

<br>

\`faces: "max-size"\` applied:

![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-face-1.jpg)

<br>

\`faces: "group"\` applied:

![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-face-group.jpg)

<br>

\`faces: 0\` applied:

![]({{site.asset_cdn}}/assets/images/abbas-malek-hosseini-22NnY93qaOk-face-0.jpg)
`),
    use: useSchema,
  })
  .describe(
    `detects faces in images and returns their coordinates, or cuts them from the original images and returns those as new images`
  )

export type ImageFacedetectRobot = z.infer<typeof imageFacedetectRobotSchema>
