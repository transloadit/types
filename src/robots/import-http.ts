import * as z from "zod";
import { ignoreErrorsSchema } from "./shared/ignore-errors";
import { useSchema } from "./shared/use";

export const importHttpRobotSchema = z.object({
  robot: z.literal("/http/import"),
  use: z.optional(useSchema),
  url: z.union([z.string(), z.array(z.string())])
    .describe(`The URL from which the file to be imported can be retrieved.
  
  You can also specify an array of URLs or a string of | delimited URLs to import several files at once. Please also check the \`url_delimiter\` parameter for that.`),
  url_delimiter: z
    .optional(z.string().default("|"))
    .describe(
      `The delimiter to use when splitting the \`url\` parameter into multiple URLs. This is only used when \`url\` is a string.`
    ),
  headers: z
    .optional(z.array(z.string()).default([]))
    .describe(`Custom headers to be sent for file import.`),
  force_name: z.optional(
    z
      .union([z.string(), z.array(z.string())])
      .nullable()
      .default(null)
      .describe(
        `Custom name for the imported file(s). Defaults to \`null\`, which means the file names are derived from the supplied URL(s).`
      )
  ),
  fail_fast: z
    .optional(z.boolean().default(false))
    .describe(
      "Disable the internal retry mechanism, and fail immediately if a resource can't be imported. This can be useful for performance critical applications."
    ),
  import_on_errors: z
    .optional(z.array(z.literal("meta")).default([]))
    .describe(
      "Setting this to `\"meta\"` will still import the file on metadata extraction errors. `ignore_errors` is similar, it also ignores the error and makes sure the Robot doesn't stop, but it doesn't import the file."
    ),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportHttpRobot = z.infer<typeof importHttpRobotSchema>;
