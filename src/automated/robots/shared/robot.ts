import { z } from "zod"

export const robotSchema = z.string()
  .describe(`Specifies which <dfn>Robot</dfn> should process files passed to this <dfn>Step</dfn>.

There are [{{collections.robots.size}} Robots](https://transloadit.com/docs/transcoding/), each with their own parameters, such
as \`width\` to control how an image is resized. The full list
of parameters per <dfn>Robot</dfn> can be taken from the
[Robot docs](https://transloadit.com/docs/transcoding/).
`)
