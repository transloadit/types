import { z } from "zod"

// 🤖/html/convert

export const html_convert_robot_schema = z
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

export type HtmlConvertRobot = z.infer<typeof html_convert_robot_schema>
