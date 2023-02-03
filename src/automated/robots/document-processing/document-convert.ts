import { z } from "zod"

// 🤖/document/convert

export const document_convert_robot_schema = z
  .object({
    robot: z.literal("/document/convert"),
    format: z
      .enum([
        "doc",
        "docx",
        "html",
        "xhtml",
        "xml",
        "pdf",
        "jpg",
        "jpeg",
        "gif",
        "png",
        "svg",
        "ai",
        "eps",
        "ps",
        "txt",
        "text",
        "csv",
        "xls",
        "xlsx",
        "xla",
        "oda",
        "odt",
        "odd",
        "ott",
        "ppt",
        "pptx",
        "ppz",
        "pps",
        "pot",
        "rtf",
        "rtx",
        "latex",
        "vtt",
        "srt",
      ])
      .default("")
      .optional().describe(`The desired format for document conversion. We support the following
values: \`doc\`, \`docx\`, \`html\`, \`xhtml\`, \`xml\`, \`pdf\`, \`jpg\`, \`jpeg\`,
\`gif\`, \`png\`, \`svg\`, \`ai\`, \`eps\`, \`ps\`, \`txt\`, \`text\`, \`csv\`, \`xls\`,
\`xlsx\`, \`xla\`, \`oda\`, \`odt\`, \`odd\`, \`ott\`, \`ppt\`, \`pptx\`, \`ppz\`, \`pps\`,
\`pot\`, \`rtf\`, \`rtx\`, \`latex\`, \`vtt\` and \`srt\`.
`),
    markdown_format: z.enum(["gfm", "commonmark"]).default("gfm").optional()
      .describe(`Markdown can be represented in several
[variants](https://www.iana.org/assignments/markdown-variants/markdown-variants.xhtml),
so when using this Robot to transform Markdown into HTML please specify
which revision is being used.

Currently this parameter can only take in the \`gfm\` and \`commonmark\`
variants of Markdown.
`),
    markdown_theme: z.enum(["github", "bare"]).default("github").optional()
      .describe(`This parameter overhalls your Markdown files styling based on several
canned presets. Valid values include \`github\` and \`bare\`.
`),
    pdf_margin: z.string().default("6.25mm,6.25mm,14.11mm,6.25mm").optional()
      .describe(`PDF Paper margins, separated by \`,\` and with units.

We support the following unit values: \`px\`, \`in\`, \`cm\`, \`mm\`.

Currently this parameter is only supported when converting from \`html\`.
`),
    pdf_print_background: z.boolean().default(true).optional()
      .describe(`Print PDF background graphics.

Currently this parameter is only supported when converting from \`html\`.
`),
    pdf_format: z.enum(["Letter", "A4"]).default("Letter").optional().describe(`PDF paper format.

We support the following values: \`Letter\`, \`Legal\`, \`Tabloid\`, \`Ledger\`,
\`A0\`, \`A1\`, \`A2\`, \`A3\`, \`A4\`, \`A5\`, \`A6\`.

Currently this parameter is only supported when converting from \`html\`.
`),
    pdf_display_header_footer: z.boolean().default(false).optional()
      .describe(`Display PDF header and footer.

Currently this parameter is only supported when converting from \`html\`.
`),
    pdf_header_template: z.string().optional().describe(`HTML template for the PDF print header.

Should be valid HTML markup with following classes used to inject printing values into them:
  - \`date\` formatted print date
  - \`title\` document title
  - \`url\` document location
  - \`pageNumber\` current page number
  - \`totalPages\` total pages in the document

Currently this parameter is only supported when converting from \`html\`,
and requires \`pdf_display_header_footer\` to be enabled.

To change the formatting of the HTML element, the \`font-size\` must be specified in a wrapper. For example, to center the page number at the top of a page you'd use the following HTML for the header template:

\`\`\`html
  <div style="font-size: 15px; width: 100%; text-align: center;"><span class="pageNumber"></span>"></span></div>
\`\`\`
`),
    pdf_footer_template: z.string().optional().describe(`HTML template for the PDF print footer.

Should use the same format as the \`pdf_header_template\`.

Currently this parameter is only supported when converting from \`html\`,
and requires \`pdf_display_header_footer\` to be enabled.

To change the formatting of the HTML element, the \`font-size\` must be specified in a wrapper. For example, to center the page number in the footer you'd use the following HTML for the footer template:

\`\`\`html
  <div style="font-size: 15px; width: 100%; text-align: center;"><span class="pageNumber"></span>"></span></div>
\`\`\`
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

export type DocumentConvertRobot = z.infer<typeof document_convert_robot_schema>
