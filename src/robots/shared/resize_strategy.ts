import { z } from "zod"

export const resize_strategy = z
  .union([
    z
      .literal("fit")
      .describe(
        "Uses the larger side of the original image as a base for the resize. Aspect ratio is preserved. Either side will become at most 100 pixels."
      ),
    z.literal("fillcrop").describe(
      `Scales the image to fit into our 100×100 target while preserving aspect ratio, while trimming away any excess surface. This means both sides will become exactly 100 pixels, at the tradeoff of destroying parts of the image.
      
By default the resulting image is horizontally/vertically centered to fill the target rectangle. Use the \`gravity\` parameter to change where to crop the image, such as \`"bottom"\` or \`"left"\`.`
    ),
    z
      .literal("minfit")
      .describe(
        `Uses the smaller side of the original image as a base for the resize. After resizing, the larger side will have a larger value than specified. Aspect ratio is preserved. Either side will become at least 100 pixels.`
      ),
    z.literal("pad").describe(
      `Scales the image to fit while preserving aspect ratio. Both sides of the resized image become exactly 100 pixels, and any remaining surface is filled with a background color.

If you set \`zoom\` to \`false\` (default is \`true\`), smaller images will be centered horizontally and vertically, and have the background padding all around them.`
    ),
    z
      .literal("stretch")
      .describe(
        "Ignores aspect ratio, resizing the image to the exact width and height specified. This may result in a stretched or distorted image."
      ),
    z.literal("crop").describe(
      `Cuts an area out of an image, discarding any overlapping parts. If the source image is smaller than the crop frame, it will be zoomed. This strategy is implied when you specify coordinates in the crop parameter, and cannot be used without it.

To crop around human faces, see [🤖/image/facedetect](https://transloadit.com/docs/transcoding/artificial-intelligence/image-facedetect/) instead.`
    ),
  ])
  .describe(
    "See the available [resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies)."
  )
