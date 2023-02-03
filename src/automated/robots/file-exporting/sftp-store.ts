import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/sftp/store

export const sftp_store_robot_schema = z
  .object({
    robot: z.literal("/sftp/store"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name
of your <dfn>Template Credentials</dfn> as this parameter's value.
They will contain the values for your SFTP host, user and optional custom
public key.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"host"\`, \`"port"\`, \`"user"\`, \`"public_key"\`
(optional).
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    url_template: z.string().default("http://host/path").optional()
      .describe(`The URL of the file in the result JSON. This may include any of the
following supported [Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    ssl_url_template: z.string().default("https://{HOST}/{PATH}").optional()
      .describe(`The SSL URL of the file in the result JSON. The following [Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables) are supported.
`),
    file_chmod: z.string().optional()
      .describe(`This optional parameter controls how an uploaded file's permission bits
are set. You can use any string format that the \`chmod\` command would
accept, such as \`"755"\`. If you don't specify this option, the file's
permission bits aren't changed at all, meaning it's up to your server's
configuration (e.g. umask).
`),
    use: use_schema,
  })
  .describe(`exports encoding results to your own SFTP server`)

export type SftpStoreRobot = z.infer<typeof sftp_store_robot_schema>
