import { z } from "zod"
import { credentialsSchema } from "../shared/credentials"
import { ignoreErrorsSchema } from "../shared/ignore-errors"

export const importSftpRobotSchema = z.object({
  robot: z.literal("/sftp/import"),
  credentials:
    credentialsSchema.describe(`Please create your associated Template Credentials in your Transloadit account and use the name of your Template Credentials as this parameter's value. They will contain the values for your SFTP host, user and optional custom public key.
  
  While we recommend to use Template Credentials at all times, some use cases demand dynamic credentials for which using Template Credentials is too unwieldy because of their static nature. If you have this requirement, feel free to use the following parameters instead: \`"host"\`, \`"port"\`, \`"user"\`, \`"public_key"\` (optional).`),
  path: z.string().describe(`At which path on your SFTP server to look for files.`),
  port: z.optional(
    z.number().int().positive().default(22).describe(`The port to use for the SFTP connection.`)
  ),
  ignore_errors: ignoreErrorsSchema,
})

export type ImportSftpRobot = z.infer<typeof importSftpRobotSchema>
