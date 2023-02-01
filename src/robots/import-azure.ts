import * as z from "zod";
import { credentialsSchema } from "./shared/credentials";
import { ignoreErrorsSchema } from "./shared/ignore-errors";
import { pathSchema } from "./shared/path";
import { useSchema } from "./shared/use";

export const importAzureRobotSchema = z.object({
  robot: z.literal("/azure/import"),
  use: z.optional(useSchema),
  credentials: credentialsSchema,
  path: pathSchema.describe(
    "The path in your container to the specific file or directory. If the path points to a file, only this file will be imported. If it points to a directory, indicated by a trailing slash (`/`), then all files that are descendants of this directory are recursively imported. If you want to import all files from the root directory, please use `/` as the value here. You can also use an array of path strings here to import multiple paths in the same Robot's Step."
  ),
  next_page_token: z.optional(
    z
      .string({
        description:
          "A string token used for pagination. The returned files of one paginated call have the next page token inside of their meta data, which needs to be used for the subsequent paging call.",
      })
      .default("")
  ),
  files_per_page: z.optional(
    z
      .number({
        description:
          "The pagination page size. This only works when recursive is `true` for now, in order to not break backwards compatibility in non-recursive imports.",
      })
      .int()
      .positive()
      .default(1000)
  ),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportAzureRobot = z.infer<typeof importAzureRobotSchema>;
