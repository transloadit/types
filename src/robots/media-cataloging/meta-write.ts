import { z } from "zod"
import { useSchema } from "../shared/use.js"
import { ffmpegStackSchema } from "../shared/ffmpeg.js"

// 🤖/meta/write

export const metaWriteRobotSchema = z
  .object({
    robot: z.literal("/meta/write"),
    data_to_write: z.record(z.string()).default({}).optional()
      .describe(`A key/value map defining the metadata to write into the file.

Valid metadata keys can be found [here](https://exiftool.org/TagNames/EXIF.html). For example: \`ProcessingSoftware\`.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
  })
  .describe(`writes metadata into any file that supports it`)

export type MetaWriteRobot = z.infer<typeof metaWriteRobotSchema>
