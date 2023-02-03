import { z } from "zod"
import { outputMetaSchema } from "../shared/output_meta"

// 🤖/upload/handle

export const uploadHandleRobotSchema = z
  .object({ robot: z.literal("/upload/handle"), output_meta: outputMetaSchema })
  .describe(
    `receives uploads that your users throw at you from browser or apps, or that you throw at us programmatically`
  )

export type UploadHandleRobot = z.infer<typeof uploadHandleRobotSchema>
