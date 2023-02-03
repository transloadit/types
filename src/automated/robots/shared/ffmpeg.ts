import { z } from "zod"

export const ffmpegSchema = z.record(z.string()).default({}).optional()
  .describe(`<a name="video-encode-ffmpeg-parameters"></a>
A parameter object to be passed to FFmpeg. For available options, see the
[FFmpeg documentation](http://ffmpeg.org/ffmpeg-doc.html). If a preset is
used, the options specified are merged on top of the ones from the preset.

For videos, the FFmpeg \`r\` parameter (framerate) has a default value of \`25\` and
maximum value of \`60\`.

If you set \`r\` to \`null\`, you clear the default of \`25\` and can preserve the original video's framerate.

For example:

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

\`\`\``)
