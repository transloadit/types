import { z } from "zod"
import { output_meta_schema } from "../shared/output_meta"

// 🤖/upload/handle

export const upload_handle_robot_schema = z
  .object({ robot: z.literal("/upload/handle"), output_meta: output_meta_schema })
  .describe(
    `receives uploads that your users throw at you from browser or apps, or that you throw at us programmatically`
  )

export type UploadHandleRobot = z.infer<typeof upload_handle_robot_schema>
