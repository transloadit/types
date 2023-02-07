import { z } from "zod"
import { useSchema } from "../shared/use.js"

// 🤖/cloudfiles/store

export const cloudfilesStoreRobotSchema = z
  .object({
    robot: z.literal("/cloudfiles/store"),
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
    path: z.string().default("${file.id}_${file.url_name}").optional()
      .describe(`The path at which to store the file. This value can also contain [Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    use: useSchema,
  })
  .describe(`exports encoding results to Rackspace Cloud Files`)

export type CloudfilesStoreRobot = z.infer<typeof cloudfilesStoreRobotSchema>
