import { z } from "zod"

export const ignoreErrorsSchema = z.optional(
  z.union([z.boolean(), z.array(z.union([z.literal("meta"), z.literal("import")]))], {
    description:
      'You might see an error when trying to extract metadata from your imported files. This happens, for example, for files with a size of zero bytes. Including `"meta"` in the array will cause the Robot to not stop the import (and the entire Assembly) when that happens. Including `"import"` in the array will ensure the Robot does not cease to function on any import errors either. To keep backwards compatibility, setting this parameter to true will set it to `["meta", "import"]` internally.',
  })
)

export type IgnoreErrors = z.infer<typeof ignoreErrorsSchema>
