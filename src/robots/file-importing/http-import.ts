import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors"

// 🤖/http/import

export const httpImportRobotSchema = z
  .object({
    robot: z.literal("/http/import"),
    url: z.union([z.string(), z.array(z.string())])
      .describe(`The URL from which the file to be imported can be retrieved.

You can also specify an array of URLs or a string of \`|\` delimited URLs to
import several files at once. Please also check the \`url_delimiter\`
parameter for that.
`),
    url_delimiter: z.string().default("|").optional()
      .describe(`Provides the delimiter that is used to split the URLs in your \`url\`
parameter value.
`),
    headers: z.array(z.string()).default([]).optional()
      .describe(`Custom headers to be sent for file import.

This is an empty array by default, such that no additional headers except
the necessary ones (e.g. Host) are sent.
`),
    force_name: z
      .union([z.string(), z.array(z.string()), z.null()])
      .nullable()
      .default(null)
      .optional()
      .describe(`Custom name for the imported file(s). Defaults to \`null\`, which means the
file names are derived from the supplied URL(s).
`),
    import_on_errors: z
      .array(z.enum(["meta"]))
      .default([])
      .optional()
      .describe(`Setting this to \`"meta"\` will still import the file on metadata extraction errors.
\`ignore_errors\` is similar, it also ignores the error and makes sure the Robot doesn't stop,
but it doesn't import the file.
`),
    fail_fast: z.boolean().default(false).optional()
      .describe(`Disable the internal retry mechanism, and fail immediately if a resource
can't be imported. This can be useful for performance critical
applications.
`),
    ignore_errors: ignoreErrorsSchema,
  })
  .describe(`imports any file that is publicly available via a web URL into Transloadit`)

export type HttpImportRobot = z.infer<typeof httpImportRobotSchema>
