import { z } from "zod"
import { useSchema } from "../shared/use.js"

// 🤖/file/compress

export const fileCompressRobotSchema = z
  .object({
    robot: z.literal("/file/compress"),
    format: z.enum(["tar", "zip"]).default("tar").optional()
      .describe(`The format of the archive to be created. Supported values are \`"tar"\` and
\`"zip"\`.

Note that \`"tar"\` without setting \`gzip\` to \`true\` results in an
archive that's not compressed in any way.
`),
    gzip: z.boolean().default(false).optional()
      .describe(`Determines if the result archive should also be gzipped. Gzip compression
is only applied if you use the \`"tar"\` format.
`),
    password: z.string().nullable().default(null).optional()
      .describe(`This allows you to encrypt all archive contents with a password and
thereby protect it against unauthorized use. To unzip the archive, the
user will need to provide the password in a text input field prompt.

This parameter has no effect if the format parameter is anything other than
\`"zip"\`.
`),
    compression_level: z
      .union([
        z.literal(0),
        z.literal(-1),
        z.literal(-2),
        z.literal(-3),
        z.literal(-4),
        z.literal(-5),
        z.literal(-6),
        z.literal(-7),
        z.literal(-8),
        z.literal(-9),
      ])
      .default(-6)
      .optional().describe(`Determines how fiercely to try to compress the archive. \`-0\` is
compressionless, which is suitable for media that is already compressed.
\`-1\` is fastest with lowest compression. \`-9\` is slowest with the highest
compression.

If you are using \`-0\` in combination with the \`tar\` format
with \`gzip\` enabled, consider setting \`gzip: false\` instead. This
results in a plain Tar archive, meaning it already has no compression.
`),
    file_layout: z.enum(["simple", "advanced"]).default("advanced").optional()
      .describe(`Determines if the result archive should contain all files in one directory
(value for this is \`"simple"\`) or in subfolders according to the
explanation below (value for this is \`"advanced"\`).

Files with same names are numbered in the \`"simple"\` file layout to avoid
naming collisions.
`),
    use: useSchema,
  })
  .describe(`creates archives of files or file conversion results`)

export type FileCompressRobot = z.infer<typeof fileCompressRobotSchema>
