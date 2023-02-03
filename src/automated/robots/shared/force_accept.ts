import { z } from "zod"

export const force_accept_schema = z.boolean().default(false).optional()
  .describe(`Force a <dfn>Robot</dfn> to accept a file type it would have ignored.

By default <dfn>Robots</dfn> ignore files they are not familiar with.
[🤖/video/encode](https://transloadit.com/docs/transcoding/video-encoding/video-encode/), for example, will happily ignore and refuse to emit images.

With the \`force_accept\` parameter set to \`true\` you can force <dfn>Robots</dfn> to accept all files
thrown at them. This will typically lead to errors and should only be used for debugging or combatting edge cases.
`)
