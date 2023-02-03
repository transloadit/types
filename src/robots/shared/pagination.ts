import { z } from "zod"

export const recursiveSchema = z.boolean().default(false).optional()
  .describe(`Setting this to \`true\` will enable importing files from subdirectories and sub-subdirectories (etc.) of the given path.

Please use the pagination parameters wisely here.
`)

export const pageNumberSchema = z.number().int().positive().default(1).optional()
  .describe(`The pagination page number. This only works when recursive is set to \`true\`.

When doing big imports, make sure no files are added or removed from other scripts within your path, otherwise you might get weird results with the pagination.
`)

export const filesPerPageSchema = z
  .number()
  .int()
  .positive()
  .default(1000)
  .optional()
  .describe(
    `The pagination page size. This only works when recursive is \`true\` for now, in order to not break backwards compatibility in non-recursive imports.`
  )

export const nextPageTokenSchema = z
  .string()
  .default("")
  .optional()
  .describe(
    `A string token used for pagination. The returned files of one paginated call have the next page token inside of their meta data, which needs to be used for the subsequent paging call.`
  )

export const startFileNameSchema = z
  .string({
    description:
      "The name of the last file from the previous paging call. This tells the Robot to ignore all files up to and including this file.",
  })
  .optional()
  .default("")
