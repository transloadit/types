import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/file/hash

export const fileHashRobotSchema = z
  .object({
    robot: z.literal("/file/hash"),
    algorithm: z.enum(["b2", "md5", "sha1", "sha224", "sha256", "sha384", "sha512"]).optional()
      .describe(`The hashing algorithm to use.

The file hash is exported as \`file.meta.hash\`.
`),
    use: useSchema,
  })
  .describe(`hashes files in Assemblies`)

export type FileHashRobot = z.infer<typeof fileHashRobotSchema>
