import { z } from "zod"
import { ignoreErrorsSchema } from "../shared/ignore-errors"
import { useSchema } from "../shared/use"

// 🤖/file/decompress

export const fileDecompressRobotSchema = z
  .object({
    robot: z.literal("/file/decompress"),
    ignore_errors: ignoreErrorsSchema,
    use: useSchema,
  })
  .describe(
    `extracts entire archives of files to be consumed by other Robots or exported as individual files`
  )

export type FileDecompressRobot = z.infer<typeof fileDecompressRobotSchema>
