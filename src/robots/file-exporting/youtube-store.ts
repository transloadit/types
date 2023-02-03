import { z } from "zod"
import { useSchema } from "../shared/use"

// 🤖/youtube/store

export const youtubeStoreRobotSchema = z
  .object({
    robot: z.literal("/youtube/store"),
    credentials: z.string()
      .describe(`The authentication Template credentials used for your YouTube account. You
can generate them on the [Template Credentials page](https://transloadit.com/c/template-credentials/). Simply add the name of
your YouTube channel, and you will be redirected to a Google verification
page. Accept the presented permissions and you will be good to go.
`),
    title: z.string().max(80).describe(`The title of the video to be displayed on YouTube.

Note that since the YouTube API requires titles to be within 80 characters,
longer titles may be truncated.
`),
    description: z
      .string()
      .max(5000)
      .describe(`The description of the video to be displayed on YouTube.`),
    category: z
      .enum([
        "autos & vehicles",
        "comedy",
        "education",
        "entertainment",
        "film & animation",
        "gaming",
        "howto & style",
        "music",
        "news & politics",
        "people & blogs",
        "pets & animals",
        "science & technology",
        "sports",
        "travel & events",
      ])
      .describe(`The category to which this video will be assigned.`),
    keywords: z.string()
      .describe(`Tags used to describe the video, separated by commas. These tags will also
be displayed on YouTube.
`),
    visibility: z
      .enum(["public", "private", "unlisted"])
      .describe(`Defines the visibility of the uploaded video.`),
    use: useSchema,
  })
  .describe(`exports encoding results to YouTube`)

export type YoutubeStoreRobot = z.infer<typeof youtubeStoreRobotSchema>
