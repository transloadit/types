import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/digitalocean/store

export const digitaloceanStoreRobotSchema = z
  .object({
    robot: z.literal("/digitalocean/store"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name of your [Template Credentials](https://transloadit.com/c/template-credentials/) as this parameter's
value. They will contain the values for your DigitalOcean Space, Key,
Secret and Region.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using <dfn>Template
Credentials</dfn> is too unwieldy because of their static nature. If you
have this requirement, feel free to use the following parameters instead:
\`"space"\`, \`"region"\` (for example: \`"fra1"\` or \`"nyc3"\`), \`"key"\`,
\`"secret"\`.
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables). The path
must not be a directory.
`),
    url_prefix: z.string().default("https://{space}.{region}.digitaloceanspaces.com/").optional()
      .describe(`The URL prefix used for the returned URL, such as
\`"https://my.cdn.com/some/path"\`.
`),
    acl: z
      .enum(["public-read", "private"])
      .default("public-read")
      .optional()
      .describe(`The permissions used for this file.`),
    headers: z.record(z.string()).default({ "Content-Type": "${file.mime}" }).optional()
      .describe(`An object containing a list of headers to be set for this file on
DigitalOcean Spaces, such as \`{ FileURL: "\${file.url_name}" }\`. This can
also include any available [Assembly Variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).

[Here](https://developers.digitalocean.com/documentation/spaces/#object)
you can find a list of available headers.

Object Metadata can be specified using \`x-amz-meta-*\` headers. Note that
these headers [do not support non-ASCII metadata values](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#UserMetadata).
`),
    sign_urls_for: z.number().int().optional()
      .describe(`This parameter provides signed URLs in the result JSON (in the
\`signed_ssl_url\` property). The number that you set this parameter to is
the URL expiry time in seconds. If this parameter is not used, no URL
signing is done.
`),
    use: useSchema,
  })
  .describe(`exports encoding results to DigitalOcean Spaces`)

export type DigitaloceanStoreRobot = z.infer<typeof digitaloceanStoreRobotSchema>
