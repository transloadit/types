import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/document/convert

export const documentConvertRobotSchema = z
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
      .describe(`The desired format for document conversion.`),
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
    pdf_format: z
      .enum(["Letter", "Legal", "Tabloid", "Ledger", "A0", "A1", "A2", "A3", "A4", "A5", "A6"])
      .default("Letter")
      .optional().describe(`PDF paper format.

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
    use: useSchema,
  })
  .describe(`converts documents into different formats`)

export type DocumentConvertRobot = z.infer<typeof documentConvertRobotSchema>
