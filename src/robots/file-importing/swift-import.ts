import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors.js"
import { filesPerPageSchema, pageNumberSchema, recursiveSchema } from "../shared/pagination.js"

// 🤖/swift/import

export const swiftImportRobotSchema = z
  .object({
    robot: z.literal("/swift/import"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name
of your <dfn>Template Credentials</dfn> as this parameter's value.
They will contain the values for your Swift bucket, Key, Secret and Bucket
region.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"bucket"\`, \`"host"\`, \`"key"\`, \`"secret"\`.
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

If you want to import all files from the root directory, please use \`/\` as
the value here. In this case, make sure all your objects belong to a path.
If you have objects in the root of your bucket that aren't prefixed with
\`/\`, you'll receive an error: \`A client error (NoSuchKey) occurred when
calling the GetObject operation: The specified key does not exist.\`

You can also use an array of path strings here to import multiple paths in
the same <dfn>Robot</dfn>'s <dfn>Step</dfn>.
`),
    recursive: recursiveSchema,
    page_number: pageNumberSchema,
    files_per_page: filesPerPageSchema,
    ignore_errors: ignoreErrorsSchema,
  })
  .describe(`imports whole directories of files from your Openstack/Swift bucket`)

export type SwiftImportRobot = z.infer<typeof swiftImportRobotSchema>
