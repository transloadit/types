import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/azure/import

export const azureImportRobotSchema = z
  .object({
    robot: z.literal("/azure/import"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name
of your [Template Credentials](https://transloadit.com/c/template-credentials/)
as this parameter's value. They will contain the values for your Azure
Container, Account and Key.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"account"\`, \`"key"\`, \`"container"\`.
`),
    path: z.union([z.string(), z.array(z.string())])
      .describe(`The path in your container to the specific file or directory. If the path
points to a file, only this file will be imported. For example:
\`images/avatar.jpg\`.

If it points to a directory, indicated by a trailing slash (\`/\`), then all
files that are descendants of this directory are recursively imported.
For example: \`images/\`.

If you want to import all files from the root directory, please use \`/\` as
the value here.

You can also use an array of path strings here to import multiple paths in
the same <dfn>Robot</dfn>'s <dfn>Step</dfn>.
`),
    next_page_token: z.string().default("").optional()
      .describe(`A string token used for pagination. The returned files of one paginated
call have the next page token inside of their meta data, which needs to be
used for the subsequent paging call.
`),
    files_per_page: z.number().int().default(1000).optional()
      .describe(`The pagination page size. This only works when recursive is \`true\` for now,
in order to not break backwards compatibility in non-recursive imports.
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
    use: useSchema,
  })
  .describe(`imports whole directories of files from your Azure container`)

export type AzureImportRobot = z.infer<typeof azureImportRobotSchema>
