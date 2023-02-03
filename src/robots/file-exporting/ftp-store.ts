import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/ftp/store

export const ftpStoreRobotSchema = z
  .object({
    robot: z.literal("/ftp/store"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name of your <dfn>Template
Credentials</dfn> as this parameter's value. They will contain the
values for your FTP host, user and password.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> with their static nature is too unwieldy.
If you have this requirement, feel free to use the following
parameters instead: \`"host"\`, \`"user"\`, \`"password"\`.
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This can contain any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).

Please note that you might need to include your homedir at the beginning
of the path.
`),
    port: z.number().int().optional().describe(`The port to use for the FTP connection.
`),
    url_template: z.string().default("https://{HOST}/{PATH}").optional()
      .describe(`The URL of the file in the result JSON. The following [Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables) are supported.
`),
    ssl_url_template: z.string().default("https://{HOST}/{PATH}").optional()
      .describe(`The SSL URL of the file in the result JSON. The following [Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables) are supported.
`),
    use: useSchema,
  })
  .describe(
    `exports encoding results to your FTP servers. This Robot relies on password access. For more security, consider our /sftp/store Robot`
  )

export type FtpStoreRobot = z.infer<typeof ftpStoreRobotSchema>
