import * as z from "zod";
import { credentialsSchema } from "../shared/credentials";
import { ignoreErrorsSchema } from "../shared/ignore-errors";
import { files_per_page, next_page_token, recursive } from "../shared/pagination";
import { pathSchema } from "../shared/path";

export const importAzureRobotSchema = z.object({
  robot: z.literal("/azure/import"),
  credentials: credentialsSchema,
  path: pathSchema.describe(
    "The path in your container to the specific file or directory. If the path points to a file, only this file will be imported. If it points to a directory, indicated by a trailing slash (`/`), then all files that are descendants of this directory are recursively imported. If you want to import all files from the root directory, please use `/` as the value here. You can also use an array of path strings here to import multiple paths in the same Robot's Step."
  ),
  recursive: z.optional(
    recursive.describe(
      "Setting this to true will enable importing files from subdirectories and sub-subdirectories (etc.) of the given path. Please use the pagination parameters `next_page_token` and `files_per_page` wisely here."
    )
  ),
  next_page_token: z.optional(next_page_token),
  files_per_page: z.optional(files_per_page),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportAzureRobot = z.infer<typeof importAzureRobotSchema>;
