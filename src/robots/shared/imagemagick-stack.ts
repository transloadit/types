import { z } from "zod"

export const imagemagickStackSchema = z.enum(["v2.0.7", "v2.0.9"]).default("v2.0.7").optional()
  .describe(`Selects the ImageMagick stack version to use for encoding.
These versions do not reflect any real
ImageMagick versions, they reflect our own internal (non-semantic)
versioning for our custom ImageMagick builds.
The current recommendation is to use \`"{{stacks.imagemagick.recommended_version}}"\`
Other valid values can be found [here](https://transloadit.com/docs/supported-formats/image-formats/).`)
