import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/dropbox/import

export const dropbox_import_robot_schema = z
  .object({
    robot: z.literal("/dropbox/import"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name of your <dfn>Template
Credentials</dfn> as this parameter's value. They will contain the
values for your access token. You can create your Dropbox Access Token
[here](https://www.dropbox.com/developers/apps/create).

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the \`"access_token"\`
parameter instead.
`),
    path: z.union([z.string(), z.array(z.string())])
      .describe(`The path in your Dropbox to the specific file or directory. If the path
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
    use: use_schema,
  })
  .describe(`imports whole directories of files from your Dropbox`)

export type DropboxImportRobot = z.infer<typeof dropbox_import_robot_schema>
