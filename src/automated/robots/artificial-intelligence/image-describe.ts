import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/image/describe

export const image_describe_robot_schema = z
  .object({
    robot: z.literal("/image/describe"),
    provider: z.enum(["aws", "gcp"])
      .describe(`Which AI provider to leverage. Valid values are \`"aws"\` and \`"gcp"\`.

Transloadit outsources this task and abstracts the interface so you can
expect the same data structures, but different latencies and information
being returned. Different cloud vendors have different areas they shine
in, and we recommend to try out and see what yields the best results for
your use case.
`),
    granularity: z.enum(["full", "list"]).default("full").optional()
      .describe(`Whether to return a flow blown response (\`"full"\`), or a flat list of
descriptions (\`"list"\`).
`),
    format: z.enum(["json", "text", "meta"]).default("json").optional()
      .describe(`In what format to return the descriptions.

- \`"json"\` returns a JSON file.
- \`"meta"\` does not return a file, but stores the data inside Transloadit's
file object (under \`\${file.meta.descriptions}\`) that's passed around
between encoding <dfn>Steps</dfn>, so that you can use the values to burn
the data into videos, filter on them, etc.
`),
    explicit_descriptions: z.boolean().default(false).optional()
      .describe(`Whether to return only explicit or only non-explicit descriptions of the
provided image. Explicit descriptions include labels for nudity, violence
etc. If set to \`false\`, only non-explicit descriptions (such as human or
chair) will be returned. If set to \`true\`, only explicit descriptions will
be returned.

The possible descriptions depend on the chosen provider. The list of labels
from AWS can be found [in their documentation](https://docs.aws.amazon.com/rekognition/latest/dg/moderation.html#moderation-api).
GCP labels the image based on five categories, as described [in their documentation](https://cloud.google.com/vision/docs/detecting-safe-search).
`),
    use: use_schema,
  })
  .describe(`recognizes objects in images and returns them as English words`)

export type ImageDescribeRobot = z.infer<typeof image_describe_robot_schema>
