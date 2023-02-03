import { z } from "zod"
import { outputMetaSchema } from "../shared/output-meta"

export const uploadHandleRobotSchema = z.object({
  robot: z.literal("/upload/handle"),
  output_meta: z.optional(outputMetaSchema),
})

export type UploadHandleRobot = z.infer<typeof uploadHandleRobotSchema>
