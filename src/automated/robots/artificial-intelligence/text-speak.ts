import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/text/speak

export const text_speak_robot_schema = z
  .object({
    robot: z.literal("/text/speak"),
    provider: z.enum(["aws", "gcp"])
      .describe(`Which AI provider to leverage. Valid values are \`"aws"\` and \`"gcp"\`.

Transloadit outsources this task and abstracts the interface so you can
expect the same data structures, but different latencies and information
being returned. Different cloud vendors have different areas they shine
in, and we recommend to try out and see what yields the best results for
your use case.
`),
    target_language: z.enum(["en-US", "en-GB", "de-DE", "fr-FR"]).default("en-US").optional()
      .describe(`The written language of the document. This will also be the language of
the spoken text.

The language should be specified in the
[BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format, such as
\`"en-GB"\`, \`"de-DE"\` or \`"fr-FR"\`. Please consult the list of supported
languages and voices.
`),
    voice: z.enum(["female-1", "male-1"]).default("female-1").optional()
      .describe(`The gender to be used for voice synthesis. Please consult the list of
supported languages and voices.
`),
    ssml: z.boolean().default(false).optional()
      .describe(`Supply [Speech Synthesis Markup Language](https://en.wikipedia.org/wiki/Speech_Synthesis_Markup_Language)
instead of raw text, in order to gain more control over how your text is
voiced, including rests and pronounciations.

Please see the supported
syntaxes for
[AWS](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html) and
[GCP](https://cloud.google.com/text-to-speech/docs/ssml).
`),
    use: use_schema,
  })
  .describe(`synthesizes speech in documents`)

export type TextSpeakRobot = z.infer<typeof text_speak_robot_schema>
