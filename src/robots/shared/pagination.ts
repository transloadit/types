import { z } from "zod";

export const recursive = z.boolean().default(false)
  .describe(`Setting this to \`true\` will enable importing files from subdirectories and sub-subdirectories (etc.) of the given path.

Please use the pagination parameters \`page_number\` and \`files_per_page\` wisely here.`);

export const page_number = z.number().int().positive().default(1)
  .describe(`The pagination page number. This only works when recursive is set to \`true\`.

When doing big imports, make sure no files are added or removed from other scripts within your path, otherwise you might get weird results with the pagination.`);

export const files_per_page = z
  .number()
  .int()
  .positive()
  .default(1000)
  .describe(
    `The pagination page size. This only works when recursive is \`true\` for now, in order to not break backwards compatibility in non-recursive imports.`
  );

export const next_page_token = z
  .string()
  .default("")
  .describe(
    `A string token used for pagination. The returned files of one paginated call have the next page token inside of their meta data, which needs to be used for the subsequent paging call.`
  );

export const start_file_name = z
  .string({
    description:
      "The name of the last file from the previous paging call. This tells the Robot to ignore all files up to and including this file.",
  })
  .default("");
