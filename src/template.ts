import { z } from "zod"
import { assemblySchema } from "./assembly.js"

export const templateSchema = z.object({
  allow_steps_override: z
    .boolean()
    .default(true)
    .optional()
    .describe(
      "Disallow overriding of Steps so that a client cannot modify the behavior of the Template in their Assemblies."
    ),
  auth: assemblySchema.shape.auth,
  notify_url: assemblySchema.shape.notify_url,
  steps: assemblySchema.shape.steps,
})

export type Template = z.infer<typeof templateSchema>
