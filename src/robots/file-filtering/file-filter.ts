import { z } from "zod"
import { useSchema } from "../shared/use.js"

// 🤖/file/filter

export const fileFilterRobotSchema = z
  .object({
    robot: z.literal("/file/filter"),
    accepts: z.array(z.array(z.string())).default([]).optional()
      .describe(`Files that match at least one requirement will be accepted, or declined
otherwise. If the array is empty, all files will be accepted. Example:

\`[["\${file.mime}", "==", "image/gif"]]\`.

If the \`condition_type\` parameter is set to \`"and"\`, then all
requirements must match for the file to be accepted.
`),
    declines: z.array(z.array(z.string())).default([]).optional()
      .describe(`Files that match at least one requirement will be declined, or accepted
otherwise. Example:

\`[["\${file.size}",">","1024"]]\`.

If the \`condition_type\` parameter is set to \`"and"\`, then all
requirements must match for the file to be declined.
`),
    condition_type: z.enum(["or", "and"]).default("or").optional()
      .describe(`Specifies the condition type according to which the members of the
\`accepts\` or \`declines\` arrays should be evaluated.
`),
    error_on_decline: z.boolean().default(false).optional()
      .describe(`If this is set to \`true\` and one or more files are declined, the Assembly
will be stopped and marked with an error.
`),
    error_msg: z.string().default("One of your files was declined").optional()
      .describe(`The error message shown to your users (such as by Uppy) when a
file is declined and \`error_on_decline\` is set to \`true\`.
`),
    use: useSchema,
  })
  .describe(`directs files to different encoding Steps based on your conditions`)

export type FileFilterRobot = z.infer<typeof fileFilterRobotSchema>
