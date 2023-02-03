import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/dropbox/store

export const dropboxStoreRobotSchema = z
  .object({
    robot: z.literal("/dropbox/store"),
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
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    create_sharing_link: z.boolean().default(false).optional()
      .describe(`Whether to create a URL to this file for sharing with other people. This
will overwrite the file's \`"url"\` property.
`),
    use: useSchema,
  })
  .describe(`exports encoding results to Dropbox`)

export type DropboxStoreRobot = z.infer<typeof dropboxStoreRobotSchema>
