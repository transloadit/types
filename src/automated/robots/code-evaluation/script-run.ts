import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/script/run

export const script_run_robot_schema = z
  .object({
    robot: z.literal("/script/run"),
    script: z.string().describe(`A string of JavaScript to evaluate. It has access to all JavaScript
features available in a modern browser environment.

The script is expected to return a \`JSON.stringify\`-able value in the
same tick, so no \`await\` or callbacks are allowed (yet).

If the script does not finish within 1000ms it times out with an error.
The return value or error is exported as
\`file.meta.result\`. If there was an error, \`file.meta.isError\` is \`true\`.
Note that the <dfn>Assembly</dfn> will not crash in this case. If you
need it to crash, you can check this value with a
[🤖/file/filter]({{robot_links["/file/filter"]}}) <dfn>Step</dfn>,
setting \`error_on_decline\` to \`true\`.

You can check whether evaluating this script was free by inspecting
\`file.meta.isFree\`. It is recommended to do this during development as to
not see sudden unexpected costs in production.
`),
    use: use_schema,
  })
  .describe(`runs scripts in Assemblies`)

export type ScriptRunRobot = z.infer<typeof script_run_robot_schema>
