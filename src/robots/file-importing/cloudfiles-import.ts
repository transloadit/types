import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors.js"
import { filesPerPageSchema, pageNumberSchema, recursiveSchema } from "../shared/pagination.js"

// 🤖/cloudfiles/import

export const cloudfilesImportRobotSchema = z
  .object({
    robot: z.literal("/cloudfiles/import"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name of your
[Template Credentials](https://transloadit.com/c/template-credentials/)
as this parameter's value. They will contain the values for your Cloud
Files Container, User, Key, Account type and Data center.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"account_type"\` ("us" or "uk"), \`"data_center"\`
("dfw" for Dallas or "ord" for Chicago for example), \`"user"\`, \`"key"\`,
\`"container"\`.
`),
    path: z.union([z.string(), z.array(z.string())])
      .describe(`The path in your bucket to the specific file or directory. If the path
points to a file, only this file will be imported. For example:
\`images/avatar.jpg\`.

If it points to a directory, indicated by a trailing slash (\`/\`), then all
files that are direct descendants of this directory will be imported. For
example: \`images/\`.

Directories are **not** imported recursively. If you want to import
files from subdirectories and sub-subdirectories, enable the \`recursive\` parameter.

You can also use an array of path strings here to import multiple paths in
the same <dfn>Robot</dfn>'s <dfn>Step</dfn>.
`),
    recursive: recursiveSchema,
    page_number: pageNumberSchema,
    files_per_page: filesPerPageSchema,
    ignore_errors: ignoreErrorsSchema,
  })
  .describe(`imports whole directories of files from your Rackspace Cloud Files container`)

export type CloudfilesImportRobot = z.infer<typeof cloudfilesImportRobotSchema>
