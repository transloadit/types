import { z } from "zod"

export const outputMetaSchema = z
  .union([
    z.literal(false, {
      description:
        "You can set this to `false` to skip metadata extraction and speed up transcoding.",
    }),
    // todo: can we infer the type of input files so we can narrow this?
    z.object({
      has_transparency: z
        .boolean()
        .describe(
          'For images, you can add `"has_transparency": true` in this object to extract if the image contains transparent parts'
        )
        .optional(),
      dominant_colors: z
        .boolean()
        .describe(
          'For images, you can add `"dominant_colors": true` in this object to extract an array of hexadecimal color codes from the image.'
        )
        .optional(),
      colorspace: z
        .boolean()
        .describe(
          'For videos, you can add the `"colorspace: true"` parameter to extract the colorspace of the output video.'
        )
        .optional(),
      mean_volume: z
        .boolean()
        .describe(
          'For audio, you can add `"mean_volume": true` to get a single value representing the mean average volume of the audio file.'
        )
        .optional(),
    }),
  ])
  .default({})
  .describe(
    "Allows you to specify a set of metadata that is more expensive on CPU power to calculate, and thus is disabled by default to keep your Assemblies processing fast."
  )
