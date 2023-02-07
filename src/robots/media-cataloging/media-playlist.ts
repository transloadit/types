import { z } from "zod"
import { useSchema } from "../shared/use.js"

// 🤖/media/playlist

export const mediaPlaylistRobotSchema = z
  .object({
    robot: z.literal("/media/playlist"),
    name: z.string().default("playlist.m3u8").optional()
      .describe(`The final name of the playlist file.
`),
    relative_to: z.string().default("").optional()
      .describe(`URL prefixes to use in the playlist file. Example: \`"/234p/"\`
`),
    resolution: z.string().default("").optional()
      .describe(`The resolution reported in the playlist file. Example: \`"416×234"\`. [More info](https://developer.apple.com/library/ios/technotes/tn2224/_index.html#//apple_ref/doc/uid/DTS40009745-CH1-DECIDEONYOURVARIANTS-DEVICE_CAPABILITIES).
`),
    codecs: z.string().default("").optional()
      .describe(`The codecs reported in the playlist file. Example:
\`"avc1.42001e,mp4a.40.34"\`. [More info](https://developer.apple.com/library/ios/technotes/tn2224/_index.html#//apple_ref/doc/uid/DTS40009745-CH1-DECIDEONYOURVARIANTS-DEVICE_CAPABILITIES).
`),
    bandwidth: z.union([z.string(), z.number().int()]).default("auto").optional()
      .describe(`The bandwidth reported in the playlist file. Example: \`2560000\`. [More  info](https://developer.apple.com/library/ios/technotes/tn2224/_index.html#//apple_ref/doc/uid/DTS40009745-CH1-DECIDEONYOURVARIANTS-DEVICE_CAPABILITIES).
This value is expressed in bits per second.
`),
    closed_captions: z.boolean().default(true).optional()
      .describe(`When set to false, adds the \`"CLOSED-CAPTIONS=NONE"\` directive to the
Playlist file.
`),
    meta_name: z.string().default("").optional()
      .describe(`The meta name as used for \`NAME\` in the \`#EXT-X-STREAM-INF\` path in
playlists. Can be different from the (file)\`name\`.
`),
    protocol: z.enum(["http", "https"]).default("http").optional()
      .describe(`The URL protocol used for all URLs in playlists. Can be \`"http"\` or
\`"https"\`.
`),
    use: useSchema,
  })
  .describe(`merges segment files to generate playlist files for HTTP Live Streaming (HLS)`)

export type MediaPlaylistRobot = z.infer<typeof mediaPlaylistRobotSchema>
