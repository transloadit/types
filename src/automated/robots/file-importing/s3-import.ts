import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/s3/import

export const s3ImportRobotSchema = z
  .object({
    robot: z.literal("/s3/import"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name
of your <dfn>Template Credentials</dfn> as this parameter's value.
They will contain the values for your S3 bucket, Key, Secret and Bucket
region.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"bucket"\`, \`"bucket_region"\` (for example:
\`"us-east-1"\` or \`"eu-west-2"\`), \`"key"\`, \`"secret"\`.
`),
    path: z.union([z.string(), z.array(z.string())])
      .describe(`The path in your bucket to the specific file or directory. If the path
points to a file, only this file will be imported. For example:
\`images/avatar.jpg\`.

If it points to a directory, indicated by a trailing slash (\`/\`), then all
files that are direct descendants to this directory will be imported. For
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
    recursive: z.boolean().default(false).optional()
      .describe(`Setting this to \`true\` will enable importing files from subdirectories and
sub-subdirectories (etc.) of the given path.

Please use the pagination parameters \`page_number\` and \`files_per_page\`
wisely here.
`),
    page_number: z.number().int().default(1).optional()
      .describe(`The pagination page number. For now, in order to not break backwards compatibility
in non-recursive imports, this only works when recursive is set to \`true\`.

When doing big imports, make sure no files are added or removed from other
scripts within your path, otherwise you might get weird results with
the pagination.
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
  .describe(`imports whole directories of files from your S3 bucket`)

export type S3ImportRobot = z.infer<typeof s3ImportRobotSchema>
