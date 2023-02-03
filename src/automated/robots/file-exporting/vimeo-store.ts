import { z } from "zod"
import { use_schema } from "../shared/use"

// 🤖/vimeo/store

export const vimeo_store_robot_schema = z
  .object({
    robot: z.literal("/vimeo/store"),
    credentials: z.string()
      .describe(`The authentication Template Credentials used for your Vimeo account. You
can generate them on the [Template Credentials page](https://transloadit.com/c/template-credentials/). You will be redirected to
a Vimeo verification page. Accept the presented permissions and you will
be good to go.
`),
    title: z.string().describe(`The title of the video to be displayed on Vimeo.
`),
    description: z.string().describe(`The description of the video to be displayed on Vimeo.
`),
    acl: z.string().optional()
      .describe(`Controls access permissions for the video. Here are the valid values:

- \`"anybody"\` — anyone can access the video.
- \`"contacts"\` — only those who follow the owner on Vimeo can access the
video.
- \`"disable"\` — the video is embeddable, but it's hidden on Vimeo and can't
be played.
- \`"nobody"\` — no one except the owner can access the video.
- \`"password"\` — only those with the password can access the video.
- \`"unlisted"\` — only those with the private link can access the video.
- \`"users"\` — only Vimeo members can access the video.
`),
    password: z.string().optional()
      .describe(`The password to access the video if \`acl\` is \`"password"\`.
`),
    showcases: z.array(z.string()).default([]).optional()
      .describe(`An array of string IDs of showcases that you want to add the video to. The
IDs can be found when browsing Vimeo. For example
\`https://vimeo.com/manage/showcases/[SHOWCASE_ID]/info\`.
`),
    downloadable: z.boolean().default(false).optional()
      .describe(`Whether or not the video can be downloaded from the Vimeo website.

Only set this to \`true\` if you have unlocked this feature in your Vimeo
accounting by upgrading to their "Pro" plan. If you use it while on their
Freemium plan, the Vimeo API will return an \`"Invalid parameter supplied"\`
error.
`),
    use: use_schema,
  })
  .describe(`exports encoding results to vimeo`)

export type VimeoStoreRobot = z.infer<typeof vimeo_store_robot_schema>
