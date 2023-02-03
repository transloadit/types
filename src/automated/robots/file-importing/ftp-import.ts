import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/ftp/import

export const ftp_import_robot_schema = z
  .object({
    robot: z.literal("/ftp/import"),
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
    path: z.string()
      .describe(`The path on your FTP server where to search for files. Files are imported
recursively from all sub-directories and sub-sub-directories (and so on)
from this path.
`),
    port: z.number().int().default(21).optional().describe(`The port to use for the FTP connection.
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
    passive_mode: z.boolean().default(true).optional()
      .describe(`Determines if passive mode should be used for the FTP connection.
`),
    use: use_schema,
  })
  .describe(
    `imports whole libraries of files from your FTP servers into Transloadit. This Robot relies on password access. For more security, consider our /sftp/import Robot`
  )

export type FtpImportRobot = z.infer<typeof ftp_import_robot_schema>
