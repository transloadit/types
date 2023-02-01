import * as z from "zod";
import { credentialsSchema } from "../shared/credentials";
import { ignoreErrorsSchema } from "../shared/ignore-errors";
import { files_per_page, recursive, start_file_name } from "../shared/pagination";
import { pathSchema } from "../shared/path";

export const importBackblazeRobotSchema = z.object({
  robot: z.literal("/backblaze/import"),
  credentials: credentialsSchema,
  path: pathSchema.describe(
    "The path in your bucket to the specific file or directory. If the path points to a file, only this file will be imported. If it points to a directory, indicated by a trailing slash (`/`), then all files that are direct descendants of this directory will be imported. Directories are not imported recursively. If you want to import files from subdirectories and sub-subdirectories, enable the recursive parameter. If you want to import all files from the root directory, please use / as the value here. In this case, make sure all your objects belong to a path. If you have objects in the root of your bucket that aren't prefixed with /, you'll receive a 404 `BACKBLAZE_IMPORT_NOT_FOUND` error. You can also use an array of path strings here to import multiple paths in the same Robot's Step."
  ),
  recursive: z.optional(
    recursive.describe(
      "Setting this to true will enable importing files from subdirectories and sub-subdirectories (etc.) of the given path. Please use the pagination parameters `start_file_name` and `files_per_page` wisely here."
    )
  ),
  start_file_name: z.optional(start_file_name),
  files_per_page: z.optional(files_per_page),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportBackblazeRobot = z.infer<typeof importBackblazeRobotSchema>;
