import * as z from "zod";

export const uploadHandleRobotSchema = z.object({
  robot: z.literal("/upload/handle"),
  output_meta: z.optional(
    z.union([
      z.literal(false, {
        description:
          "You can set this to `false` to skip metadata extraction and speed up transcoding.",
      }),
      // todo: can we infer the type of input files so we can narrow this?
      z.object({
        has_transparency: z.optional(z.boolean(), {
          description:
            'For images, you can add `"has_transparency": true` in this object to extract if the image contains transparent parts',
        }),
        dominant_colors: z.optional(z.boolean(), {
          description:
            'For images, you can add `"dominant_colors": true` in this object to extract an array of hexadecimal color codes from the image.',
        }),
        colorspace: z.optional(z.boolean(), {
          description:
            'For videos, you can add the `"colorspace: true"` parameter to extract the colorspace of the output video.',
        }),
        mean_volume: z.optional(z.boolean(), {
          description:
            'For audio, you can add `"mean_volume": true` to get a single value representing the mean average volume of the audio file.',
        }),
      }),
    ]),
    {
      description:
        "Allows you to specify a set of metadata that is more expensive on CPU power to calculate, and thus is disabled by default to keep your Assemblies processing fast.",
    }
  ),
  use: z.optional(
    z.never({ description: "Do not define a `use` parameter, contrary to all other Robots." })
  ),
});

export type UploadHandleRobot = z.infer<typeof uploadHandleRobotSchema>;
