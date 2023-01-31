import * as z from "zod";
import { credentialsSchema } from "./shared/credentials";
import { useSchema } from "./shared/use";

export const importDigitalOceanRobotSchema = z.object({
  name: z.literal("/digitalocean/import"),
  use: useSchema,
  credentials: credentialsSchema.describe(""),
});

export type ImportDigitalOceanRobot = z.infer<typeof importDigitalOceanRobotSchema>;
