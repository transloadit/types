import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/file/serve

export const fileServeRobotSchema = z
  .object({
    robot: z.literal("/file/serve"),
    headers: z
      .record(z.string())
      .default({
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Cache-Control, Accept, Content-Length, Transloadit-Client, Authorization",
        "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=259200, s-max-age=86400",
        "Content-Type": "${file.mime}; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Transloadit-Assembly": "…",
        "Transloadit-RequestID": "…",
      })
      .optional()
      .describe(`An object containing a list of headers to be set for a file as we serve it
to a CDN/web browser, such as \`{ FileURL: "\${file.url_name}" }\` which will
be merged over the defaults, and can include any available [Assembly Variable](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    use: useSchema,
  })
  .describe(`serves files to web browsers`)

export type FileServeRobot = z.infer<typeof fileServeRobotSchema>
