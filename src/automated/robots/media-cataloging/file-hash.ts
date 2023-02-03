import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/file/hash

export const file_hash_robot_schema = z
  .object({
    robot: z.literal("/file/hash"),
    algorithm: z.enum(["b2", "md5", "sha1", "sha224", "sha256", "sha384", "sha512"]).optional()
      .describe(`The hashing algorithm to use. Supported values are \`"b2"\`, \`"md5"\`,
\`"sha1"\`, \`"sha224"\`, \`"sha256"\`, \`"sha384"\` and \`"sha512"\`.

The file hash is exported as \`file.meta.hash\`.
`),
    use: use_schema,
  })
  .describe(`hashes files in Assemblies`)

export type FileHashRobot = z.infer<typeof file_hash_robot_schema>
