import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors"
import { filesPerPageSchema, nextPageTokenSchema } from "../shared/pagination"

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
    next_page_token: nextPageTokenSchema,
    files_per_page: filesPerPageSchema,
    ignore_errors: ignoreErrorsSchema,
  })
  .describe(`imports whole directories of files from your Azure container`)

export type AzureImportRobot = z.infer<typeof azureImportRobotSchema>
