import { z } from "zod";
import { output_meta } from "../shared/output-meta";
import { useSchema } from "../shared/use";

export const videoConcatRobotSchema = z.object({
  robot: z.literal("/video/concat"),
  use: useSchema,
  output_meta: z.optional(output_meta),
});
