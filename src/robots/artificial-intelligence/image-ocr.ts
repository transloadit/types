import { z } from "zod"
import { useSchema } from "../shared/use.js"

// 🤖/image/ocr

export const imageOcrRobotSchema = z
  .object({
    robot: z.literal("/image/ocr"),
    provider: z.enum(["aws", "gcp"])
      .describe(`Which AI provider to leverage. Valid values are \`"aws"\` and \`"gcp"\`.

Transloadit outsources this task and abstracts the interface so you can
expect the same data structures, but different latencies and information
being returned. Different cloud vendors have different areas they shine
in, and we recommend to try out and see what yields the best results for
your use case.
`),
    granularity: z.enum(["full", "list"]).default("full").optional()
      .describe(`Whether to return a flow blown response including coordinates for the text
(\`"full"\`), or a flat list of the extracted phrases (\`"list"\`). This
parameter has no effect if the \`format\` parameter is set to \`"text"\`.
`),
    format: z.enum(["json", "meta", "text"]).default("json").optional()
      .describe(`In what format to return the extracted text.
- \`"json"\` returns a JSON file.
- \`"meta"\` does not return a file, but stores the data inside Transloadit's
file object (under \`\${file.meta.recognized_text}\`, which is an array of strings) that's passed around
between encoding <dfn>Steps</dfn>, so that you can use the values to burn
the data into videos, filter on them, etc.
- \`"text"\` returns the recognized text as a plain UTF-8 encoded text file.
`),
    use: useSchema,
  })
  .describe(`recognizes text in images and returns it in a machine-readable format`)

export type ImageOcrRobot = z.infer<typeof imageOcrRobotSchema>
