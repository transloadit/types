import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/s3/store

export const s3StoreRobotSchema = z
  .object({
    robot: z.literal("/s3/store"),
    credentials: z.string()
      .describe(`Please create your associated <dfn>Template Credentials</dfn> in your
Transloadit account and use the name
of your <dfn>Template Credentials</dfn> as this parameter's value.
They will contain the values for your S3 bucket, Key, Secret and Bucket
region.

While we recommend to use <dfn>Template Credentials</dfn> at all times,
some use cases demand dynamic credentials for which using
<dfn>Template Credentials</dfn> is too unwieldy because of their static
nature. If you have this requirement, feel free to use the following
parameters instead: \`"bucket"\`, \`"bucket_region"\` (for example:
\`"us-east-1"\` or \`"eu-west-2"\`), \`"key"\`, \`"secret"\`.
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables). The path
must not be a directory.
`),
    url_prefix: z.string().default("http://{bucket}.s3.amazonaws.com/").optional()
      .describe(`The URL prefix used for the returned URL, such as
\`"http://my.cdn.com/some/path/"\`.
`),
    acl: z
      .enum(["public-read", "public", "private", "bucket-default"])
      .default("public-read")
      .optional().describe(`The permissions used for this file. This can be \`"public-read"\`,
\`"public"\`, \`"private"\` or \`"bucket-default"\`.

Please keep in mind that the default value \`"public-read"\` can lead to
permission errors due to the \`"Block all public access"\` checkbox that is
checked by default when creating a new Amazon S3 Bucket in the AWS
console.
`),
    check_integrity: z.boolean().default(false).optional()
      .describe(`Calculate and submit the file's checksum in order for S3 to verify its
integrity after uploading, which can help with occasional file corruption
issues.

Enabling this option adds to the overall execution time, as
integrity checking can be CPU intensive, especially for larger files.
`),
    headers: z.record(z.string()).default({ "Content-Type": "${file.mime}" }).optional()
      .describe(`An object containing a list of headers to be set for this file on S3, such
as \`{ FileURL: "\${file.url_name}" }\`. This can also include any available
[Assembly Variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables). You can
find a list of available headers [here](https://docs.aws.amazon.com/AmazonS3/latest/API/RESTObjectPUT.html).

Object Metadata can be specified using \`x-amz-meta-*\` headers. Note that
these headers [do not support non-ASCII metadata values](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMetadata.html#UserMetadata).
`),
    host: z.string().default("s3.amazonaws.com").optional()
      .describe(`The host of the storage service used. This only needs to be set when the
storage service used is not Amazon S3, but has a compatible API (such as
hosteurope.de).
`),
    no_vhost: z.boolean().default(false).optional()
      .describe(`Set to \`true\` if you use a custom host and run into access denied errors.
`),
    sign_urls_for: z.number().int().optional()
      .describe(`This parameter provides signed URLs in the result JSON (in the
\`signed_url\` and \`signed_ssl_url\` properties). The number that you set
this parameter to is the URL expiry time in seconds. If this parameter is
not used, no URL signing is done.
`),
    use: useSchema,
  })
  .describe(`exports encoding results to Amazon S3`)

export type S3StoreRobot = z.infer<typeof s3StoreRobotSchema>
