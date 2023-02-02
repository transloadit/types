import { z } from "zod"

export const pathSchema = z.union([z.string(), z.array(z.string())])

export type Path = z.infer<typeof pathSchema>
