import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/text/translate

export const text_translate_robot_schema = z
  .object({
    robot: z.literal("/text/translate"),
    provider: z.enum(["aws", "gcp"])
      .describe(`Which AI provider to leverage. Valid values are \`"aws"\` (Amazon Web
Services) and \`"gcp"\` (Google Cloud Platform).

Transloadit outsources this
task and abstracts the interface so you can expect the same data
structures, but different latencies and information being returned.
Different cloud vendors have different areas they shine in, and we
recommend to try out and see what yields the best results for your use
case.
`),
    target_language: z.enum(["en", "de", "fr"]).default("en").optional()
      .describe(`The desired language to translate to.

If the exact language can't be
found, a generic variant can be fallen back to. For example, if you
specify \`"en-US"\`, "en" will be used instead. Please consult the list of
supported languages for each provider.
`),
    source_language: z.string().optional().describe(`The desired language to translate from.

By default, both providers will detect this automatically, but there
are be cases where specifying the source language prevents ambiguities.

If the exact language can't be found, a generic variant can be fallen
back to. For example, if you specify \`"en-US"\`, "en" will be used instead.
Please consult the list of supported languages for each provider.
`),
    use: use_schema,
  })
  .describe(`translates text in documents`)

export type TextTranslateRobot = z.infer<typeof text_translate_robot_schema>
