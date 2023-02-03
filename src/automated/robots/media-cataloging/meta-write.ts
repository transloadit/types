import { z } from "zod"
import { use_schema } from "../shared/use"
import { ffmpeg_stack_schema } from "../shared/ffmpeg_stack"

// 🤖/meta/write

export const meta_write_robot_schema = z
  .object({
    robot: z.literal("/meta/write"),
    data_to_write: z.record(z.string()).default({}).optional()
      .describe(`A key/value map defining the metadata to write into the file.

Valid metadata keys can be found [here](https://exiftool.org/TagNames/EXIF.html). For example: \`ProcessingSoftware\`.
`),
    use: use_schema,
    ffmpeg_stack: ffmpeg_stack_schema,
  })
  .describe(`writes metadata into any file that supports it`)

export type MetaWriteRobot = z.infer<typeof meta_write_robot_schema>
