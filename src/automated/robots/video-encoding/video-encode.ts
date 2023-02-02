/* eslint-disable no-useless-escape */
import { z } from "zod"

// 🤖/video/encode

export const video_encode_robot_schema = z.object({
  robot: z.literal("/video/encode"),
  preset: z.string().default("flash").optional()
    .describe(`Converts a video according to [pre-configured settings](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).

If you specify your own FFmpeg parameters using the <dfn>Robot</dfn>'s
and/or do not not want Transloadit to set any encoding setting, starting
\`ffmpeg_stack: "v3.3.3"\`,  you can use the value \`'empty'\` here.
`),
  width: z.number().int().min(1).max(1920).optional().describe(`Width of the new video, in pixels.

If the value is not specified and the \`preset\` parameter is available, the
\`preset\`'s [supplied width](https://transloadit.com/docs/transcoding/video-encoding/video-presets/) will be
implemented.
`),
  height: z.number().int().min(1).max(1080).optional().describe(`Height of the new video, in pixels.

If the value is not specified and the \`preset\` parameter is available, the
\`preset\`'s [supplied height](https://transloadit.com/docs/transcoding/video-encoding/video-presets/) will be
implemented.
`),
  resize_strategy: z
    .enum(["fit", "fillcrop", "min_fit", "pad", "stretch", "crop"])
    .default("pad")
    .optional()
    .describe(`See the [available resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
  zoom: z.boolean().default(true).optional()
    .describe(`If this is set to \`false\`, smaller videos will not be stretched to the
desired width and height. For details about the impact of zooming for your
preferred resize strategy, see the list of available [resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
  crop: z
    .union([z.record(z.string()), z.string()])
    .nullable()
    .optional().describe(`Specify an object containing coordinates for the top left and bottom right
corners of the rectangle to be cropped from the original video(s). Values
can be integers for absolute pixel values or strings for percentage based
values.

For example:

\`\`\`json

{
  "x1": 80,
  "y1": 100,
  "x2": "60%",
  "y2": "80%"
}

\`\`\`

This will crop the area from \`(80, 100)\` to \`(600, 800)\` from a 1000×1000
pixels video, which is a square whose width is 520px and height is 700px.
If \`crop\` is set, the width and height parameters are ignored, and the
\`resize_strategy\` is set to \`crop\` automatically.

You can also use a JSON string of such an object with coordinates in
similar fashion:
\`"{ \"x1\": <Integer>, \"y1\": <Integer>, \"x2\": <Integer>, \"y2\": <Integer> }"\`
`),
  background: z.string().default("00000000").optional()
    .describe(`The background color of the resulting video the \`"rrggbbaa"\` format (red,
green, blue, alpha) when used with the \`"pad"\` resize strategy. The
default color is black.
`),
  rotate: z
    .union([
      z.literal(0),
      z.literal(90),
      z.literal(180),
      z.literal(270),
      z.literal(360),
      z.literal(false),
    ])
    .optional().describe(`Forces the video to be rotated by the specified degree integer. Currently,
only multiples of \`90\` are supported. We automatically correct the
orientation of many videos when the orientation is provided by the camera.
This option is only useful for videos requiring rotation because it was
not detected by the camera. If you set \`rotate\` to \`false\` no rotation is
performed, even if the metadata contains such instructions.
`),
  hint: z.boolean().default(false).optional()
    .describe(`Enables hinting for mp4 files, for RTP/RTSP streaming.
`),
  turbo: z.boolean().default(false).optional()
    .describe(`Splits the video into multiple chunks so that each chunk can be encoded in
parallel before all encoded chunks are stitched back together to form the
result video. This comes at the expense of extra <dfn>Priority Job
Slots</dfn> and may prove to be counter-productive for very small video
files.
`),
  chunk_duration: z.number().int().optional()
    .describe(`Allows you to specify the duration of each chunk when \`turbo\` is set to
\`true\`. This means you can take advantage of that feature while using
fewer <dfn>Priority Job Slots</dfn>. For instance, the longer each chunk
is, the fewer <dfn>Encoding Jobs</dfn> will need to be used.
`),
  freeze_detect: z.boolean().default(false).optional()
    .describe(`Examines the transcoding result file for video freeze frames and re-transcodes the video
a second time if they are found. This is useful when you are using \`turbo: true\` because
freeze frames can sometimes happen there. The re-transcode would then happen without turbo mode.
`),
  ffmpeg: z.record(z.string()).default({}).optional()
    .describe(`<a name="video-encode-ffmpeg-parameters"></a>

A parameter object to be passed to FFmpeg. For available options, see the
[FFmpeg documentation](https://ffmpeg.org/ffmpeg-doc.html). If a preset is
used, the options specified are merged on top of the ones from the preset.

The FFmpeg \`r\` parameter (framerate) has a default value of \`25\` and
maximum value of \`60\`.

If you set \`r\` to \`null\`, you clear the default of \`25\` and can preserve
the original video's framerate. For example:

\`\`\`json

"steps": {
  "video_encode": {
    "robot": "/video/encode",
    "use": ":original",
    "ffmpeg_stack": "v4.3.1",
    "preset": "web/mp4/1080p",
    "ffmpeg": {
      "b:v": "600k"
    }
  }
}

\`\`\`

You can also add \`input_options\` which will be used before the \`-i\` in
ffmpeg. For example in the following case, the final command will look like \`ffmpeg -fflags +genpts -i input_video ...\`:
\`\`\`json

"steps": {
  "video_encode": {
    "robot": "/video/encode",
    "use": ":original",
    "ffmpeg_stack": "v4.3.1",
    "preset": "web/mp4/1080p",
    "ffmpeg": {
      "input_options": {
        "fflags": "+genpts"
      },
      "b:v": "600k"
    }
  }
}

\`\`\`
`),
  watermark_url: z.string().default("").optional()
    .describe(`A URL indicating a PNG image to be overlaid above this image. Please note
that you can also [supply the watermark via another Assembly Step](https://transloadit.com/docs/transcoding/video-encoding/video-encode/#watermark-parameters-video-encode).
`),
  watermark_position: z
    .union([z.string(), z.array(z.string())])
    .default("center")
    .optional().describe(`The position at which the watermark is placed. The available options are
\`"center"\`, \`"top"\`, \`"bottom"\`, \`"left"\`, and \`"right"\`. You can also
combine options, such as \`"bottom-right"\`.

An array of possible values can also be specified, in which case one value
will be selected at random, such as \`[ "center", "left", "bottom-left",
"bottom-right" ]\`.

This setting puts the watermark in the specified corner. To use a specific
pixel offset for the watermark, you will need to add the padding to the
image itself.
`),
  watermark_x_offset: z.number().int().default(0).optional()
    .describe(`The x-offset in number of pixels at which the watermark will be placed in
relation to the position it has due to \`watermark_position\`.

Values can be both positive and negative and yield different results
depending on the \`watermark_position\` parameter. Positive values move the
watermark closer to the image's center point, whereas negative values move
the watermark further away from the image's center point.
`),
  watermark_y_offset: z.number().int().default(0).optional()
    .describe(`The y-offset in number of pixels at which the watermark will be placed in
relation to the position it has due to \`watermark_position\`.

Values can be both positive and negative and yield different results
depending on the \`watermark_position\` parameter. Positive values move the
watermark closer to the image's center point, whereas negative values move
the watermark further away from the image's center point.
`),
  watermark_size: z.string().default("").optional()
    .describe(`The size of the watermark, as a percentage, such as \`"50%"\`. How the
watermark is resized greatly depends on the \`watermark_resize_strategy\`.
`),
  watermark_resize_strategy: z.enum(["fit", "stretch", "area"]).default("fit").optional()
    .describe(`Available values are \`"fit"\`, \`"stretch"\` and \`"area"\`.

To explain how the resize strategies work, let's assume our target video
size is 800×800 pixels and our watermark image is 400×300 pixels. Let's
also assume, the \`watermark_size\` parameter is set to \`"25%"\`.

For the \`"fit"\` resize strategy, the watermark is scaled so that the
longer side of the watermark takes up 25% of the corresponding video side.
And the other side is scaled according to the aspect ratio of the
watermark image. So with our watermark, the width is the longer side, and
25% of the video size would be 200px. Hence, the watermark would be
resized to 200×150 pixels. If the \`watermark_size\` was set to \`"50%"\`", it
would be resized to 400×300 pixels (so just left at its original size).

For the \`"stretch"\` resize strategy, the watermark image is stretched
(meaning, it is resized without keeping its aspect ratio in mind) so that
both sides take up 25% of the corresponding video side. Since our video is
800×800 pixels, for a watermark size of 25% the watermark would be resized
to 200×200 pixels. Its height would appear stretched, because keeping the
aspect ratio in mind it would be resized to 200×150 pixels instead.

For the \`"area"\` resize strategy, the watermark is resized (keeping its
aspect ratio in check) so that it covers \`"xx%"\` of the video's surface
area. The value from \`watermark_size\` is used for the percentage area
size.
`),
  watermark_start_time: z.number().default(0).optional()
    .describe(`The delay in seconds from the start of the video for the watermark to
appear. By default the watermark is immediately shown.
`),
  watermark_duration: z.number().default(-1).optional()
    .describe(`The duration in seconds for the watermark to be shown. Can be used
together with \`watermark_start_time\` to create nice effects. The
default value is \`-1.0\`, which means that the
watermark is shown for the entire duration of the video.
`),
  watermark_opacity: z.number().default(1).optional()
    .describe(`The opacity of the watermark. Valid values are between \`0\` (invisible) and
\`1.0\` (full visibility).
`),
  segment: z.boolean().default(false).optional()
    .describe(`Splits the file into multiple parts, to be used for Apple's [HTTP Live Streaming](https://developer.apple.com/resources/http-streaming/).
`),
  segment_duration: z.number().int().default(10).optional()
    .describe(`Specifies the length of each HTTP segment. This is optional, and the
default value as recommended by Apple is \`10\`. Do not change this value
unless you have a good reason.
`),
  segment_prefix: z.string().optional()
    .describe(`The prefix used for the naming. For example, a prefix of \`"segment_"\`
would produce files named \`"segment_0.ts"\`, \`"segment_1.ts"\`, and so on.
This is optional, and defaults to the base name of the input file. Also
see the related \`segment_name\` parameter.
`),
  segment_name: z.string().default("${segment_prefix}${segment_number}.ts").optional()
    .describe(`The name used for the final segment. Available variables are
\`\${segment_prefix}\`, \`\${segment_number}\` and \`\${segment_id}\` (which is a
UUIDv4 without dashes).
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

export type VideoEncodeRobot = z.infer<typeof video_encode_robot_schema>
