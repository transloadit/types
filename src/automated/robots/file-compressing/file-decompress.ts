import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/file/decompress

export const file_decompress_robot_schema = z
  .object({
    robot: z.literal("/file/decompress"),
    ignore_errors: z
      .union([z.array(z.string()), z.boolean()])
      .default([])
      .optional().describe(`A possible array member is only \`"meta"\`.

You might see an error when trying to extract metadata from the files inside
your archive. This happens, for example, for files with a size of zero bytes.
Setting this to \`true\` will cause the <dfn>Robot</dfn> to not
stop the file decompression (and the entire <dfn>Assembly</dfn>) when that
happens.

To keep backwards compatibility, setting this parameter to \`true\` will set
it to \`["meta"]\` internally.
`),
    use: use_schema,
  })
  .describe(
    `extracts entire archives of files to be consumed by other Robots or exported as individual files`
  )

export type FileDecompressRobot = z.infer<typeof file_decompress_robot_schema>
