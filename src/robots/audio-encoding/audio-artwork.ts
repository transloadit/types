import { z } from "zod"
import { useSchema } from "../shared/use"
import { ffmpegStackSchema } from "../shared/ffmpeg"

// 🤖/audio/artwork

export const audioArtworkRobotSchema = z
  .object({
    robot: z.literal("/audio/artwork"),
    method: z.enum(["extract", "insert"]).default("extract").optional()
      .describe(`What should be done with the audio file. A value of \`"extract"\` means
audio artwork will be extracted. A value of \`"insert"\` means the provided
image will be inserted as audio artwork.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
  })
  .describe(
    `extracts the embedded cover artwork from audio files and allows you to pipe it into other Steps, for example into /image/resize Steps. It can also insert images into audio files as cover artwork`
  )

export type AudioArtworkRobot = z.infer<typeof audioArtworkRobotSchema>
