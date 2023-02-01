import * as z from "zod";
import { credentialsSchema } from "./shared/credentials";
import { ignoreErrorsSchema } from "./shared/ignore-errors";
import { pathSchema } from "./shared/path";
import { useSchema } from "./shared/use";

export const importDigitalOceanRobotSchema = z.object({
  robot: z.literal("/digitalocean/import"),
  use: z.optional(useSchema),
  credentials: credentialsSchema.describe(
    'Please create your associated Template Credentials in your Transloadit account and use the name of your Template Credentials as this parameter\'s value. They will contain the values for your DigitalOcean Space, Key, Secret and Region. While we recommend to use Template Credentials at all times, some use cases demand dynamic credentials for which using Template Credentials is too unwieldy because of their static nature. If you have this requirement, feel free to use the following parameters instead: `"space"`, `"region"` (for example: `"fra1"` or `"nyc3"`), `"key"`, `"secret"`.'
  ),
  path: pathSchema.describe(
    "The path in your bucket to the specific file or directory. If the path points to a file, only this file will be imported. If it points to a directory, indicated by a trailing slash (`/`), then all files that are direct descendants of this directory will be imported. Directories are **not** imported recursively. If you want to import files from subdirectories and sub-subdirectories, enable the `recursive` parameter. You can also use an array of path strings here to import multiple paths in the same Robot's Step."
  ),
  recursive: z.optional(
    z
      .boolean({
        description:
          "Setting this to `true` will enable importing files from subdirectories and sub-subdirectories (etc.) of the given path. Please use the pagination parameters `page_number` and `files_per_page` wisely here.",
      })
      .default(false)
  ),
  page_number: z.optional(
    z
      .number({
        description:
          "The pagination page number. This only works when recursive is set to `true`. When doing big imports, make sure no files are added or removed by other scripts within your path, otherwise you might get weird results with the pagination.",
      })
      .int()
      .positive()
      .default(1)
  ),
  files_per_page: z.optional(
    z
      .number({
        description: "The pagination page size. This only works when recursive is `true`.",
      })
      .int()
      .positive()
      .default(1000)
  ),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportDigitalOceanRobot = z.infer<typeof importDigitalOceanRobotSchema>;
