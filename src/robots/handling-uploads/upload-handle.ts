import { z } from "zod";
import { output_meta } from "../shared/output-meta";

export const uploadHandleRobotSchema = z.object({
  robot: z.literal("/upload/handle"),
  output_meta: z.optional(output_meta),
});

export type UploadHandleRobot = z.infer<typeof uploadHandleRobotSchema>;
