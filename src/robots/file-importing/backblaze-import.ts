import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors.js"
import { filesPerPageSchema, startFileNameSchema } from "../shared/pagination.js"

// 🤖/backblaze/import

export const backblazeImportRobotSchema = z
  .object({
    robot: z.literal("/backblaze/import"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name of your <dfn>Template
Credentials</dfn> as this parameter's value.
They will contain the values for your Backblaze Bucket Name, App Key ID, and App Key.

To create your credential information, head over to Backblaze, sign in to
your account, and select "Create a Bucket". Save the name of your bucket,
and click on the "App Keys" tab, scroll to the bottom of the page then
select “Add a New Application Key”. Allow access to your recently created
bucket, select  “Read and Write” as your type of access, and tick the
“Allow List All Bucket Names” option.

Now that everything is in place, create your key, and take note of the
information you are given so you can input the information into your
<dfn>Template Credentials</dfn>.

⚠️ Your App Key will only be viewable once, so make sure you note this
down.
[{.alert .alert-warning}]

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"bucket"\`, \`"app_key_id"\`, \`"app_key"\`.
`),
    path: z.union([z.string(), z.array(z.string())])
      .describe(`The path in your bucket to the specific file or directory. If the path
points to a file, only this file will be imported. For example:
\`images/avatar.jpg\`.

If it points to a directory, indicated by a trailing slash (\`/\`), then all
files that are direct descendants of this directory will be imported. For example:
\`images/\`.

Directories are **not** imported recursively. If you want to import
files from subdirectories and sub-subdirectories, enable the \`recursive\` parameter.

If you want to import all files from the root directory, please use \`/\` as
the value here. In this case, make sure all your objects belong to a path.
If you have objects in the root of your bucket that aren't prefixed with
\`/\`, you'll receive a 404 \`BACKBLAZE_IMPORT_NOT_FOUND\` error.

You can also use an array of path strings here to import multiple paths in
the same <dfn>Robot</dfn>'s <dfn>Step</dfn>.
`),
    recursive: z.boolean().default(false).optional()
      .describe(`Setting this to \`true\` will enable importing files from subdirectories and
sub-subdirectories (etc.) of the given path.

Please use the pagination parameters \`start_file_name\` and
\`files_per_page\` wisely here.
`),
    start_file_name: startFileNameSchema,
    files_per_page: filesPerPageSchema,
    ignore_errors: ignoreErrorsSchema,
  })
  .describe(`imports whole directories of files from your Backblaze bucket`)

export type BackblazeImportRobot = z.infer<typeof backblazeImportRobotSchema>
