import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/backblaze/store

export const backblazeStoreRobotSchema = z
  .object({
    robot: z.literal("/backblaze/store"),
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
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    headers: z.record(z.string()).default({}).optional()
      .describe(`An object containing a list of headers to be set for this file on
backblaze, such as \`{ FileURL: "\${file.url_name}" }\`. This can also
include any available [Assembly Variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).

[Here](https://www.backblaze.com/b2/docs/b2_upload_file.html) you can find
a list of available headers.

Object Metadata can be specified using \`X-Bz-Info-*\` headers.
`),
    use: useSchema,
  })
  .describe(`exports encoding results to Backblaze`)

export type BackblazeStoreRobot = z.infer<typeof backblazeStoreRobotSchema>
