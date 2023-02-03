import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/file/virusscan

export const fileVirusscanRobotSchema = z
  .object({
    robot: z.literal("/file/virusscan"),
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
  .describe(
    `rejects millions of trojans, viruses, malware & other malicious threats before they reach your platform`
  )

export type FileVirusscanRobot = z.infer<typeof fileVirusscanRobotSchema>
