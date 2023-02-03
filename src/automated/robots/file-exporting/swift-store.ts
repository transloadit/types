import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/swift/store

export const swiftStoreRobotSchema = z
  .object({
    robot: z.literal("/swift/store"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name
of your <dfn>Template Credentials</dfn> as this parameter's value.
They will contain the values for your Swift bucket, Key, Secret and Bucket
region.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"bucket"\`, \`"host"\`, \`"key"\`, \`"secret"\`.
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables). The path
must not be a directory.
`),
    acl: z.enum(["public-read", "private"]).default("public-read").optional()
      .describe(`The permissions used for this file. This can be \`"public-read"\` or
\`"private"\`.
`),
    headers: z.record(z.string()).default({ "Content-Type": "${file.mime}" }).optional()
      .describe(`An object containing a list of headers to be set for this file on swift
Spaces, such as \`{ FileURL: "\${file.url_name}" }\`. This can also include
any available [Assembly Variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).

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
  .describe(`exports encoding results to Openstack Swift buckets`)

export type SwiftStoreRobot = z.infer<typeof swiftStoreRobotSchema>
