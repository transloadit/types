import * as z from "zod";
import { credentialsSchema } from "../shared/credentials";
import { ignoreErrorsSchema } from "../shared/ignore-errors";

export const importFtpRobotSchema = z.object({
  robot: z.literal("/ftp/import"),
  credentials: credentialsSchema.describe(
    'Please create your associated Template Credentials in your Transloadit account and use the name of your Template Credentials as this parameter\'s value. They will contain the values for your FTP host, user and password. While we recommend to use Template Credentials at all times, some use cases demand dynamic credentials for which using Template Credentials with their static nature is too unwieldy. If you have this requirement, feel free to use the following parameters instead: `"host"`, `"user"`, "pa`ssword"`.'
  ),
  path: z.string({
    description:
      "The path on your FTP server where to search for files. Files are imported recursively from all sub-directories and sub-sub-directories (and so on) from this path.",
  }),
  port: z.optional(
    z
      .number({ description: "The port to use for the FTP connection." })
      .int()
      .positive()
      .default(21)
  ),
  passive_mode: z.optional(
    z.boolean({ description: "Whether to use passive mode for the FTP connection." }).default(true)
  ),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportFtpRobot = z.infer<typeof importFtpRobotSchema>;
