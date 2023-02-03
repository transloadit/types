import { z } from "zod"
import { use_schema } from "../shared/use"
import { ffmpeg_stack_schema } from "../shared/ffmpeg_stack"

// 🤖/audio/artwork

export const audio_artwork_robot_schema = z
  .object({
    robot: z.literal("/audio/artwork"),
    method: z.enum(["extract", "insert"]).default("extract").optional()
      .describe(`What should be done with the audio file. A value of \`"extract"\` means
audio artwork will be extracted. A value of \`"insert"\` means the provided
image will be inserted as audio artwork.
`),
    use: use_schema,
    ffmpeg_stack: ffmpeg_stack_schema,
  })
  .describe(
    `extracts the embedded cover artwork from audio files and allows you to pipe it into other Steps, for example into /image/resize Steps. It can also insert images into audio files as cover artwork`
  )

export type AudioArtworkRobot = z.infer<typeof audio_artwork_robot_schema>
