import { z } from "zod"

// 🤖/video/thumbs

export const video_thumbs_robot_schema = z.object({
  robot: z.literal("/video/thumbs"),
  count: z.number().int().min(1).max(999).default(8).optional()
    .describe(`The number of thumbnails to be extracted. As some videos have incorrect
durations, the actual number of thumbnails generated may be less in rare
cases. The maximum number of thumbnails we currently allow is 999.
`),
  offsets: z
    .union([z.array(z.number().int()), z.array(z.string())])
    .default([])
    .optional().describe(`An array of offsets representing seconds of the file duration, such as \`[
2, 45, 120 ]\`. Millisecond durations of a file can also be used by using
decimal place values.  For example, an offset from 1250 milliseconds would
be represented with \`1.25\`. Offsets can also be percentage values such as
\`[ "2%", "50%", "75%" ]\`.

This option cannot be used with the \`count\`
parameter, and takes precedence if both are specified. Out-of-range
offsets are silently ignored.
`),
  format: z.enum(["jpeg", "jpg", "png"]).default("jpeg").optional()
    .describe(`The format of the extracted thumbnail. Supported values are \`"jpg"\`,
\`"jpeg"\` and \`"png"\`. Even if you specify the format to be \`"jpeg"\` the
resulting thumbnails will have a \`"jpg"\` file extension.
`),
  width: z.number().int().min(1).max(1920).optional()
    .describe(`The width of the thumbnail, in pixels.
`),
  height: z.number().int().min(1).max(1080).optional()
    .describe(`The height of the thumbnail, in pixels.
`),
  resize_strategy: z
    .enum(["fit", "fillcrop", "min_fit", "pad", "stretch", "crop"])
    .default("pad")
    .optional()
    .describe(`One of the [available resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
  background: z.string().default("00000000").optional()
    .describe(`The background color of the resulting thumbnails in the \`"rrggbbaa"\` format
(red, green, blue, alpha) when used with the \`"pad"\` resize strategy. The
default color is black.
`),
  rotate: z.number().int().optional()
    .describe(`Forces the video to be rotated by the specified degree integer. Currently,
only multiples of 90 are supported. We automatically correct the
orientation of many videos when the orientation is provided by the camera.
This option is only useful for videos requiring rotation because it was
not detected by the camera.
`),
  use: z.union([z.string(), z.array(z.string()), z.record(z.string())])
    .describe(`Specifies which <dfn>Step</dfn>(s) to use as input.

- You can pick any names for Steps except \`":original"\` (reserved for user uploads handled by Transloadit)

- You can provide several Steps as input with arrays:

  \`\`\`json
  "use": [
    ":original",
    "encoded",
    "resized"
  ]
  \`\`\`

💡 That’s likely all you need to know about \`use\`, but you can view advanced use
cases:

<details>
  <summary class="summary">› Advanced use cases</summary>

- **Step bundling**. Some <dfn>Robots</dfn> can gather several <dfn>Step</dfn> results for a single invocation. For example, [🤖/file/compress](https://transloadit.com/docs/transcoding/file-compressing/file-compress/) would normally create one archive for each file passed to it. If you'd set \`bundle_steps\` to true, however, it will create one archive containing all the result files from all <dfn>Steps</dfn> you give it. To enable bundling, provide an object like the one below to the \`use\` parameter:

  \`\`\`json
  "use": {
    "steps": [
      ":original",
      "encoded",
      "resized"
    ],
    "bundle_steps": true
  }
  \`\`\`

  This is also a crucial parameter
  for [🤖/video/adaptive](https://transloadit.com/docs/transcoding/video-encoding/video-adaptive/),
  otherwise you'll generate 1 playlist for each viewing quality. <br />
  Keep in
  mind that all input <dfn>Steps</dfn> must be present in your
  <dfn>Template</dfn>. If one of them is missing (for instance it is rejected by a filter), no result is generated because the
  <dfn>Robot</dfn> waits indefinitely for all input <dfn>Steps</dfn> to be
  finished.

  Here’s a [demo](https://transloadit.com/demos/document-processing/generate-html-based-artwork-and-overlay-on-video/)
  that showcases <dfn>Step</dfn> bundling.

- **Group by original.** Sticking with [🤖/file/compress](https://transloadit.com/docs/transcoding/file-compressing/file-compress/) example, you can set
  \`group_by_original\` to \`true\`, in order to create a separate archive
  for each of your uploaded or imported files, instead of
  creating one archive containing all originals (or one per resulting file). This is important for
  for 🤖/media/playlist where you'd typically
  set:

  \`\`\`json
  "use": {
    "steps": [
      "segmented"
    ],
    "bundle_steps": true,
    "group_by_original": true
  }
  \`\`\`

- **Fields.** You can be more discriminatory by only using files that match a field name by
  setting the \`fields\` property. When this array is specified, the
  corresponding <dfn>Step</dfn> will only be
  executed for files submitted through one of the given field names, which
  correspond with the strings in the \`name\` attribute of the HTML file input field
  tag for instance. When using a back-end SDK, it corresponds with \`myFieldName1\` in
  e.g.: \`$transloadit->addFile('myFieldName1', './chameleon.jpg')\`.

  This parameter is set to \`true\` by default, meaning all
  fields are accepted.

  Example:

  \`\`\`json
  "use": {
    "steps": [ ":original" ],
    "fields": [ "myFieldName1" ]
  }
  \`\`\`

- **Use as**. Sometimes <dfn>Robots</dfn> take several inputs. For instance,
  [🤖/video/merge](https://transloadit.com/docs/transcoding/video-encoding/video-merge/) can create a slideshow
  from audio and images. You can map different <dfn>Steps</dfn> to the appropriate inputs.

  Example:

  \`\`\`json
  "use": {
    "steps": [
      { "name": "audio_encoded", "as": "audio" },
      { "name": "images_resized", "as": "image" }
    ]
  }
  \`\`\`

  Sometimes the ordering is important, for instance, with our concat <dfn>Robots</dfn>.
  In these cases, you can add an index that starts at 1. You can also
  optionally filter by the multipart field name. Like in this example, where all files are coming
  from the same source (end-user uploads), but with different \`<input>\` names:

  Example:

  \`\`\`json
  "use": {
    "steps": [
      { "name": ":original", "fields": "myFirstVideo", "as": "video_1" },
      { "name": ":original", "fields": "mySecondVideo", "as": "video_2" },
      { "name": ":original", "fields": "myThirdVideo", "as": "video_3" }
    ]
  }
  \`\`\`

  For times when it is not apparent where we should put the file, you can use <dfn>Assembly Variables</dfn>
  to be specific. For instance, you may want to pass a text file to
  [🤖/image/resize](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/) to burn the text in an image, but
  you are burning multiple texts, so where do we put the text file? We specify it via \`\${use.text_1}\`,
  to indicate the first text file that was passed.

  Example:

  \`\`\`json
  "watermarked": {
    "robot": "/image/resize",
    "use"  : {
      "steps": [
        { "name": "resized", "as": "base" },
        { "name": "transcribed", "as": "text" },
      ],
    },
    "text": [
      {
        "text"  : "Hi there",
        "valign": "top",
        "align" : "left",
      },
      {
        "text"    : "From the 'transcribed' Step: \${use.text_1}",
        "valign"  : "bottom",
        "align"   : "right",
        "x_offset": 16,
        "y_offset": -10,
      }
    ]
  }
  \`\`\`

</details>`),
  ffmpeg_stack: z.string().default("v3.3.3").optional()
    .describe(`Selects the FFmpeg stack version to use for encoding.
These versions reflect real FFmpeg versions.

The current recommendation is to use \`"{{stacks.ffmpeg.recommended_version}}"\`.
Other valid values can be found [here](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).
`),
  output_meta: z
    .union([z.record(z.string()), z.boolean()])
    .default({})
    .optional().describe(`Allows you to specify a set of metadata that is more expensive on CPU
power to calculate, and thus is disabled by default to keep your Assemblies
processing fast.

For images, you can add \`"has_transparency": true\` in this object to extract if the
image contains transparent parts and \`"dominant_colors": true\` to extract
an array of hexadecimal color codes from the image.

For videos, you can add the \`"colorspace: true"\` parameter to extract the colorspace of the 
output video.

For audio, you can add \`"mean_volume": true\` to get a single value representing the 
mean average volume of the audio file.

You can also set this to \`false\` to skip metadata extraction and speed up
transcoding.
`),
})

export type VideoThumbsRobot = z.infer<typeof video_thumbs_robot_schema>