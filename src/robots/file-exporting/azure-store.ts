import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/azure/store

export const azureStoreRobotSchema = z
  .object({
    robot: z.literal("/azure/store"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name of your
[Template Credentials](https://transloadit.com/c/template-credentials/)
as this parameter's value. They will contain the values for your Azure
Container, Account and Key.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"account"\`, \`"key"\`, \`"container"\`.
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    content_type: z.string().optional()
      .describe(`The content type with which to store the file. By default this will be
guessed by Azure.
`),
    content_encoding: z.string().optional()
      .describe(`The content encoding with which to store the file. By default this will be
guessed by Azure.
`),
    content_language: z.string().optional()
      .describe(`The content language with which to store the file. By default this will be
guessed by Azure.
`),
    cache_control: z.string().optional()
      .describe(`The cache control header with which to store the file.
`),
    metadata: z.record(z.string()).default({}).optional()
      .describe(`A JavaScript object containing a list of metadata to be set for this file
on Azure, such as \`{ FileURL: "\${file.url_name}" }\`. This can also include
any available [Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    sas_expires_in: z.union([z.number().int(), z.null()]).default(null).optional()
      .describe(`Set this to a number to enable shared access signatures for your stored
object. This reflects the number of seconds that the signature will be
valid for once the object is stored. Enabling this will attach the shared
access signature (SAS) to the result URL of your object.
`),
    sas_permissions: z.string().optional()
      .describe(`Set this to a combination of \`r\` (read), \`w\` (write) and \`d\` (delete) for
your shared access signatures (SAS) permissions.
`),
    use: useSchema,
  })
  .describe(`exports encoding results to Microsoft Azure`)

export type AzureStoreRobot = z.infer<typeof azureStoreRobotSchema>
