import { z } from "zod";
import { credentialsSchema } from "../shared/credentials";
import { ignoreErrorsSchema } from "../shared/ignore-errors";
import { files_per_page, page_number, recursive } from "../shared/pagination";
import { pathSchema } from "../shared/path";

export const importRackspaceCloudfilesRobotSchema = z.object({
  robot: z.literal("/cloudfiles/import"),
  credentials: credentialsSchema.describe(
    'Please create your associated Template Credentials in your Transloadit account and use the name of your Template Credentials as this parameter\'s value. They will contain the values for your Cloud Files Container, User, Key, Account type and Data center. While we recommend to use Template Credentials at all times, some use cases demand dynamic credentials for which using Template Credentials is too unwieldy because of their static nature. If you have this requirement, feel free to use the following parameters instead: `"account_type"` (`"us"` or `"uk"`), `"data_center"` (`"dfw"` for Dallas or `"ord"` for Chicago for example), `"user",` `"key"`, `"container"`.'
  ),
  path: pathSchema.describe(
    "The path in your bucket to the specific file or directory. If the path points to a file, only this file will be imported. If it points to a directory, indicated by a trailing slash (`/`), then all files that are direct descendants of this directory will be imported. Directories are not imported recursively. If you want to import files from subdirectories and sub-subdirectories, enable the `recursive` parameter. You can also use an array of path strings here to import multiple paths in the same Robot's Step."
  ),
  recursive: z.optional(recursive),
  page_number: z.optional(page_number),
  files_per_page: z.optional(files_per_page),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportRackspaceCloudfilesRobot = z.infer<typeof importRackspaceCloudfilesRobotSchema>;
