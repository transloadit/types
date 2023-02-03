import { z } from "zod"

export const result_schema = z.boolean().optional()
  .describe(`Controls whether the results of this <dfn>Step</dfn> should be present in the <dfn>Assembly Status JSON</dfn>.

If set to \`true\`, the result of this <dfn>Step</dfn> will be present. If files
from that <dfn>Step</dfn> weren't exported to your storage, their
location will be set to a temporary URL.

By default, we set this to \`true\` for leaf <dfn>Steps</dfn> and \`false\` for any intermediate <dfn>Step</dfn>.

Explicitly setting it to \`false\` can be a useful tool in keeping the <dfn>Assembly Status JSON</dfn> small.

Setting \`result: true\` on storage <dfn>Steps</dfn> does **not** add those Steps to the <dfn>Assembly</dfn> JSON, but only changes the returned URL values
for the results of any transcoding <dfn>Steps</dfn> passed into those storage <dfn>Steps</dfn>. If you pipe a transcoding <dfn>Step</dfn> into multiple
storage <dfn>Steps</dfn> (for example /s3/store) with each having \`result: true\`, then multiple results for this transcoding <dfn>Step</dfn> will be added
to the <dfn>Assembly</dfn> JSON, giving you a quick overview of all file URLs for the various S3 buckets (in this example).
`)
