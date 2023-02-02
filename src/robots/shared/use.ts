import { z } from "zod"

const step = z.union([
  z.string(),
  z.object({
    name: z.string(),
    as: z.string({
      description:
        "Sometimes Robots take several inputs. For instance, 🤖/video/merge can create a slideshow from audio and images. You can map different Steps to the appropriate inputs.",
    }),
    fields: z.string({
      description:
        "Sometimes the ordering is important, for instance, with our concat Robots. In these cases, you can add an index that starts at 1. You can also optionally filter by the multipart field name.",
    }),
  }),
])

const advancedUseSchema = z.object(
  {
    steps: z.array(step),
    bundle_steps: z.optional(z.boolean(), {
      description: "Create one archive containing all the result files from all Steps",
    }),
    group_by_original: z.optional(z.boolean(), {
      description:
        "Create a separate archive for each of your uploaded or imported files, instead of creating one archive containing all originals (or one per resulting file)",
    }),
    fields: z
      .optional(z.union([z.boolean(), z.array(z.string())]), {
        description:
          "You can be more discriminatory by only using files that match a field name by setting the fields property. When this array is specified, the corresponding Step will only be executed for files submitted through one of the given field names, which correspond with the strings in the name attribute of the HTML file input field tag for instance. This parameter is set to `true` by default, meaning all fields are accepted.",
      })
      .default(true),
  },
  { description: "Advanced use cases for the `use` parameter" }
)

export const useSchema = z.union([z.string(), z.array(z.string()), advancedUseSchema], {
  description: "Specify which steps to use as input",
})

export type Use = z.infer<typeof useSchema>
