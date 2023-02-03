import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/speech/transcribe

export const speech_transcribe_robot_schema = z
  .object({
    robot: z.literal("/speech/transcribe"),
    provider: z.enum(["aws", "gcp"])
      .describe(`Which AI provider to leverage. Valid values are \`"aws"\` and \`"gcp"\`.

Transloadit outsources this task and abstracts the interface so you can
expect the same data structures, but different latencies and information
being returned. Different cloud vendors have different areas they shine
in, and we recommend to try out and see what yields the best results for
your use case.
`),
    granularity: z.enum(["full", "list"]).default("full").optional()
      .describe(`Whether to return a flow blown response (\`"full"\`), or a flat list of
descriptions (\`"list"\`).
`),
    format: z.enum(["json", "text", "srt", "webvtt", "meta"]).default("json").optional()
      .describe(`Output format for the transcription.

- \`"text"\` outputs a plain text file that you can store and process.
- \`"json"\` outputs a JSON file containing timestamped words.
- \`"srt"\` and \`"webvtt"\` output subtitle files of those
respective file types, which can be stored separately or used in other
encoding <dfn>Steps</dfn>.
- \`"meta"\` does not return a file, but stores the
data inside  Transloadit's file object (under
\`\${file.meta.transcription.text}\`) that's passed around between encoding
<dfn>Steps</dfn>, so that you can use the values to burn the data into
videos, filter on them, etc.
`),
    source_language: z.enum(["en-US", "en-GB", "de-DE", "fr-FR"]).default("en-US").optional()
      .describe(`The spoken language of the audio or video. This will also be the language
of the transcribed text.

The language should be specified in the
[BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format, such as
\`"en-GB"\`, \`"de-DE"\` or \`"fr-FR"\`. Please also consult the list of
supported languages for [the \`gcp\` provider](https://cloud.google.com/speech-to-text/docs/languages) and the
[the \`aws\` provider](https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html).
`),
    use: use_schema,
  })
  .describe(`transcribes speech in audio or video files`)

export type SpeechTranscribeRobot = z.infer<typeof speech_transcribe_robot_schema>
