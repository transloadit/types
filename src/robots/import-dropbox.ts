import * as z from "zod";
import { credentialsSchema } from "./shared/credentials";
import { ignoreErrorsSchema } from "./shared/ignore-errors";
import { pathSchema } from "./shared/path";
import { useSchema } from "./shared/use";

export const importDropboxRobotSchema = z.object({
  robot: z.literal("/dropbox/import"),
  use: z.optional(useSchema),
  credentials: credentialsSchema,
  path: pathSchema.describe(
    "The path in your Dropbox to the specific file or directory. If the path points to a file, only this file will be imported. If it points to a directory, indicated by a trailing slash (`/`), then all files that are descendants of this directory are recursively imported. If you want to import all files from the root directory, please use `/` as the value here. You can also use an array of path strings here to import multiple paths in the same Robot's Step."
  ),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportDropboxRobot = z.infer<typeof importDropboxRobotSchema>;
