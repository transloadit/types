import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/google/store

export const googleStoreRobotSchema = z
  .object({
    robot: z.literal("/google/store"),
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
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly Variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    acl: z
      .enum([
        "public-read",
        "authenticated-read",
        "bucket-owner-full-control",
        "private",
        "project-private",
      ])
      .default("public-read")
      .optional().describe(`The permissions used for this file. This can be \`"public-read"\`,
\`"authenticated-read"\`, \`"bucket-owner-full-control"\`, \`"private"\` or
\`"project-private"\`.
`),
    use: useSchema,
  })
  .describe(`exports encoding results to Google Storage`)

export type GoogleStoreRobot = z.infer<typeof googleStoreRobotSchema>
