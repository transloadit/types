import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/sftp/import

export const sftpImportRobotSchema = z
  .object({
    robot: z.literal("/sftp/import"),
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
    path: z.string().describe(`The path on your SFTP server where to search for files.
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
    port: z.number().int().default(22).optional().describe(`The port to use for the connection.
`),
    use: useSchema,
  })
  .describe(
    `imports whole libraries of files from your SFTP servers into Transloadit. This Robot relies on public key authentication`
  )

export type SftpImportRobot = z.infer<typeof sftpImportRobotSchema>
