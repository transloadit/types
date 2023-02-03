import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/http/import

export const http_import_robot_schema = z
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
    ignore_errors: z
      .union([z.array(z.string()), z.boolean()])
      .default([])
      .optional().describe(`Possible array members are \`"meta"\` and \`"import"\`.

You might see an error when trying to extract metadata from your imported
files. This happens, for example, for files with a size of zero bytes.
Including \`"meta"\` in the array will cause the <dfn>Robot</dfn>
to not stop the import (and the entire <dfn>Assembly</dfn>) when that happens.

Including \`"import"\` in the array will ensure the <dfn>Robot</dfn> does
not cease to function on any import errors either.

To keep backwards compatibility, setting this parameter to \`true\` will set
it to \`["meta", "import"]\` internally.
`),
    import_on_errors: z.array(z.string()).default([]).optional()
      .describe(`Possible array members are \`"meta"\`.

Setting this to \`"meta"\` will still import the file on metadata extraction errors.
\`ignore_errors\` is similar, it also ignores the error and makes sure the Robot doesn't stop,
but it doesn't import the file.
`),
    fail_fast: z.boolean().default(false).optional()
      .describe(`Disable the internal retry mechanism, and fail immediately if a resource
can't be imported. This can be useful for performance critical
applications.
`),
    use: use_schema,
  })
  .describe(`imports any file that is publicly available via a web URL into Transloadit`)

export type HttpImportRobot = z.infer<typeof http_import_robot_schema>
