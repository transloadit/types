import { z } from "zod"

// 🤖/image/facedetect

export const image_facedetect_robot_schema = z
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
    faces: z.enum(["each", "max-confidence", "max-size", "group"]).default("each").optional()
      .describe(`Determines which of the detected faces should be returned. Valid values
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
    use: z.union([z.string(), z.array(z.string()), z.record(z.string())])
      .describe(`Specifies which <dfn>Step</dfn>(s) to use as input.

- You can pick any names for Steps except \`":original"\` (reserved for user uploads handled by Transloadit)

- You can provide several Steps as input with arrays:

  \`\`\`json
  "use": [
    ":original",
    "encoded",
    "resized"
  ]
  \`\`\`

💡 That’s likely all you need to know about \`use\`, but you can view advanced use
cases:

<details>
  <summary class="summary">› Advanced use cases</summary>

- **Step bundling**. Some <dfn>Robots</dfn> can gather several <dfn>Step</dfn> results for a single invocation. For example, [🤖/file/compress](https://transloadit.com/docs/transcoding/file-compressing/file-compress/) would normally create one archive for each file passed to it. If you'd set \`bundle_steps\` to true, however, it will create one archive containing all the result files from all <dfn>Steps</dfn> you give it. To enable bundling, provide an object like the one below to the \`use\` parameter:

  \`\`\`json
  "use": {
    "steps": [
      ":original",
      "encoded",
      "resized"
    ],
    "bundle_steps": true
  }
  \`\`\`

  This is also a crucial parameter
  for [🤖/video/adaptive](https://transloadit.com/docs/transcoding/video-encoding/video-adaptive/),
  otherwise you'll generate 1 playlist for each viewing quality. <br />
  Keep in
  mind that all input <dfn>Steps</dfn> must be present in your
  <dfn>Template</dfn>. If one of them is missing (for instance it is rejected by a filter), no result is generated because the
  <dfn>Robot</dfn> waits indefinitely for all input <dfn>Steps</dfn> to be
  finished.

  Here’s a [demo](https://transloadit.com/demos/document-processing/generate-html-based-artwork-and-overlay-on-video/)
  that showcases <dfn>Step</dfn> bundling.

- **Group by original.** Sticking with [🤖/file/compress](https://transloadit.com/docs/transcoding/file-compressing/file-compress/) example, you can set
  \`group_by_original\` to \`true\`, in order to create a separate archive
  for each of your uploaded or imported files, instead of
  creating one archive containing all originals (or one per resulting file). This is important for
  for 🤖/media/playlist where you'd typically
  set:

  \`\`\`json
  "use": {
    "steps": [
      "segmented"
    ],
    "bundle_steps": true,
    "group_by_original": true
  }
  \`\`\`

- **Fields.** You can be more discriminatory by only using files that match a field name by
  setting the \`fields\` property. When this array is specified, the
  corresponding <dfn>Step</dfn> will only be
  executed for files submitted through one of the given field names, which
  correspond with the strings in the \`name\` attribute of the HTML file input field
  tag for instance. When using a back-end SDK, it corresponds with \`myFieldName1\` in
  e.g.: \`$transloadit->addFile('myFieldName1', './chameleon.jpg')\`.

  This parameter is set to \`true\` by default, meaning all
  fields are accepted.

  Example:

  \`\`\`json
  "use": {
    "steps": [ ":original" ],
    "fields": [ "myFieldName1" ]
  }
  \`\`\`

- **Use as**. Sometimes <dfn>Robots</dfn> take several inputs. For instance,
  [🤖/video/merge](https://transloadit.com/docs/transcoding/video-encoding/video-merge/) can create a slideshow
  from audio and images. You can map different <dfn>Steps</dfn> to the appropriate inputs.

  Example:

  \`\`\`json
  "use": {
    "steps": [
      { "name": "audio_encoded", "as": "audio" },
      { "name": "images_resized", "as": "image" }
    ]
  }
  \`\`\`

  Sometimes the ordering is important, for instance, with our concat <dfn>Robots</dfn>.
  In these cases, you can add an index that starts at 1. You can also
  optionally filter by the multipart field name. Like in this example, where all files are coming
  from the same source (end-user uploads), but with different \`<input>\` names:

  Example:

  \`\`\`json
  "use": {
    "steps": [
      { "name": ":original", "fields": "myFirstVideo", "as": "video_1" },
      { "name": ":original", "fields": "mySecondVideo", "as": "video_2" },
      { "name": ":original", "fields": "myThirdVideo", "as": "video_3" }
    ]
  }
  \`\`\`

  For times when it is not apparent where we should put the file, you can use <dfn>Assembly Variables</dfn>
  to be specific. For instance, you may want to pass a text file to
  [🤖/image/resize](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/) to burn the text in an image, but
  you are burning multiple texts, so where do we put the text file? We specify it via \`\${use.text_1}\`,
  to indicate the first text file that was passed.

  Example:

  \`\`\`json
  "watermarked": {
    "robot": "/image/resize",
    "use"  : {
      "steps": [
        { "name": "resized", "as": "base" },
        { "name": "transcribed", "as": "text" },
      ],
    },
    "text": [
      {
        "text"  : "Hi there",
        "valign": "top",
        "align" : "left",
      },
      {
        "text"    : "From the 'transcribed' Step: \${use.text_1}",
        "valign"  : "bottom",
        "align"   : "right",
        "x_offset": 16,
        "y_offset": -10,
      }
    ]
  }
  \`\`\`

</details>`),
  })
  .describe("undefined")

export type ImageFacedetectRobot = z.infer<typeof image_facedetect_robot_schema>
