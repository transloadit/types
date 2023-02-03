import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors"
import { filesPerPageSchema, nextPageTokenSchema, recursiveSchema } from "../shared/pagination"

// 🤖/google/import

export const googleImportRobotSchema = z
  .object({
    robot: z.literal("/google/import"),
    credentials: z.string()
      .describe(`Create a new [Google service account](https://cloud.google.com/storage/docs/authentication).
Set its role to "Storage Object Creator". Choose "JSON" for the key file
format and download it to your computer. You will need to upload this
file when creating your <dfn>Template Credentials</dfn>.

Go back to your Google credentials project and enable the "Google Cloud
Storage JSON API" for it. Wait around ten minutes for the action to
propagate through the Google network. Grab the project ID from the dropdown
menu in the header bar on the Google site. You will also need it later on.

Now you can set up the \`storage.objects.create\` and \`storage.objects.delete\`
permissions. The latter is optional and only required if you intend to
overwrite existing paths.

To do this from the Google Cloud console, navigate to "IAM & Admin" and select
"Roles". From here, select "+CREATE ROLE", enter a name, set the role launch
stage as general availability and set the permissions stated above.

Next, relocate to your storage browser and select the ellipsis on your
bucket to edit bucket permissions. From here, select "ADD MEMBER", enter your
service account as a new member and select your newly created role.

Then, create your associated [Template Credentials](https://transloadit.com/c/template-credentials/) in your Transloadit
account and use the name of your <dfn>Template Credentials</dfn>
as this parameter's value.
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
\`/\`, you'll receive a 404 \`GOOGLE_IMPORT_NOT_FOUND\` error.

You can also use an array of path strings here to import multiple paths in
the same <dfn>Robot</dfn>'s <dfn>Step</dfn>.
`),
    recursive: recursiveSchema,
    next_page_token: nextPageTokenSchema,
    files_per_page: filesPerPageSchema,
    ignore_errors: ignoreErrorsSchema,
  })
  .describe(`imports whole directories of files from Google Storage`)

export type GoogleImportRobot = z.infer<typeof googleImportRobotSchema>
