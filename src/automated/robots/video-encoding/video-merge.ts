import { z } from "zod"
import { useSchema } from "../shared/use"
import { ffmpegStackSchema } from "../shared/ffmpeg_stack"
import { outputMetaSchema } from "../shared/output_meta"

// 🤖/video/merge

export const videoMergeRobotSchema = z
  .object({
    robot: z.literal("/video/merge"),
    preset: z.string().default("flash").optional()
      .describe(`Generates the video according to [pre-configured video presets](https://transloadit.com/docs/transcoding/video-encoding/video-presets/).

If you specify your own FFmpeg parameters using the <dfn>Robot</dfn>'s
\`ffmpeg\` parameter and you have not specified a preset, then the default
\`"flash"\` preset is not applied. This is to prevent you from having to
override each of the flash preset's values manually.
`),
    width: z.number().int().min(1).max(1920).optional().describe(`Width of the new video, in pixels.

If the value is not specified and the \`preset\` parameter is available, the
\`preset\`'s [supplied width](https://transloadit.com/docs/transcoding/video-encoding/video-presets/) will be
implemented.
`),
    height: z.number().int().min(1).max(1080).optional()
      .describe(`Height of the new video, in pixels.

If the value is not specified and the \`preset\` parameter is available, the
\`preset\`'s [supplied height](https://transloadit.com/docs/transcoding/video-encoding/video-presets/) will be
implemented.
`),
    resize_strategy: z
      .enum(["fit", "fillcrop", "min_fit", "pad", "stretch", "crop"])
      .default("pad")
      .optional().describe(`If the given width/height parameters are bigger than the input image's
dimensions, then the \`resize_strategy\` determines how the image will be
resized to match the provided width/height. See the [available resize strategies](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/#resize-strategies).
`),
    background: z.string().default("00000000").optional()
      .describe(`The background color of the resulting video the \`"rrggbbaa"\` format (red,
green, blue, alpha) when used with the \`"pad"\` resize strategy. The
default color is black.
`),
    framerate: z.string().default("1/5").optional()
      .describe(`When merging images to generate a video this is the input framerate. A
value of "1/5" means each image is given 5 seconds before the next frame
appears (the inverse of a framerate of "5"). Likewise for "1/10", "1/20",
etc. A value of "5" means there are 5 frames per second.
`),
    image_durations: z.array(z.number()).optional()
      .describe(`When merging images to generate a video this allows you to define how long
(in seconds) each image will be shown inside of the video. So if you pass
3 images and define \`[2.4, 5.6, 9]\` the first image will be shown for
2.4s, the second image for 5.6s and the last one for 9s. The \`duration\`
parameter will automatically be set to the sum of the image_durations, so
\`17\` in our example. It can still be overwritten, though, in which case
the last image will be shown until the defined duration is reached.
`),
    duration: z.number().default(5).optional()
      .describe(`When merging images to generate a video or when merging audio and video
this is the desired target duration in seconds. The float value can take
one decimal digit. If you want all images to be displayed exactly once,
then you can set the duration according to this formula: \`duration =
numberOfImages / framerate\`. This also works for the inverse framerate
values like \`1/5\`.

If you set this value to \`null\` (default), then the duration of the input audio file
will be used when merging images with an audio file.

When merging audio files and video files, the duration of the longest video or audio file is used by default.
`),
    audio_delay: z.number().default(0).optional()
      .describe(`When merging a video and an audio file, and when merging images and an
audio file to generate a video, this is the desired delay in seconds for
the audio file to start playing. Imagine you merge a video file without
sound and an audio file, but you wish the audio to start playing after 5
seconds and not immediately, then this is the parameter to use.
`),
    ffmpeg: z.record(z.string()).default({}).optional()
      .describe(`A parameter object to be passed to FFmpeg. For available options, see the
[FFmpeg documentation](https://ffmpeg.org/ffmpeg-doc.html). If a preset is
used, the options specified are merged on top of the ones from the preset.
`),
    use: useSchema,
    ffmpeg_stack: ffmpegStackSchema,
    output_meta: outputMetaSchema,
  })
  .describe(`composes a new video by adding an audio track to existing still image(s) or video`)

export type VideoMergeRobot = z.infer<typeof videoMergeRobotSchema>
