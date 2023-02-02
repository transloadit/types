import { z } from "zod"

export const ffmpeg_v3_3_3_presets = z.enum([
  "aac",
  "alac",
  "android-high",
  "android-low",
  "android",
  "dash-1080p-video",
  "dash-128k-audio",
  "dash-256k-audio",
  "dash-270p-video",
  "dash-32k-audio",
  "dash-360p-video",
  "dash-480p-video",
  "dash-540p-video",
  "dash-576p-video",
  "dash-64k-audio",
  "dash-720p-video",
  "empty",
  "flac",
  "flash",
  "gif",
  "hevc",
  "hls-1080p",
  "hls-270p",
  "hls-360p",
  "hls-480p",
  "hls-540p",
  "hls-576p",
  "hls-720p",
  "ipad-high",
  "ipad-low",
  "ipad",
  "iphone-high",
  "iphone-low",
  "iphone",
  "mp3",
  "ogg",
  "ogv",
  "opus",
  "speech",
  "wav",
  "webm-1080p",
  "webm-270p",
  "webm-360p",
  "webm-480p",
  "webm-540p",
  "webm-576p",
  "webm-720p",
  "webm",
  "wmv",
])

export const ffmpeg_v4_3_1_presets = z.union([
  z.literal("aac"),
  z.literal("alac"),
  z.literal("android-high"),
  z.literal("android-low"),
  z.literal("android"),
  z.literal("audio/aac"),
  z.literal("audio/alac"),
  z.literal("audio/flac"),
  z.literal("audio/mp3"),
  z.literal("audio/ogg"),
  z.literal("dash/1080p-video"),
  z.literal("dash/128k-audio"),
  z.literal("dash/256k-audio"),
  z.literal("dash/270p-video"),
  z.literal("dash/32k-audio"),
  z.literal("dash/360p-video"),
  z.literal("dash/480p-video"),
  z.literal("dash/540p-video"),
  z.literal("dash/576p-video"),
  z.literal("dash/64k-audio"),
  z.literal("dash/720p-video"),
  z.literal("dash-1080p-video"),
  z.literal("dash-128k-audio"),
  z.literal("dash-256k-audio"),
  z.literal("dash-270p-video"),
  z.literal("dash-32k-audio"),
  z.literal("dash-360p-video"),
  z.literal("dash-480p-video"),
  z.literal("dash-540p-video"),
  z.literal("dash-576p-video"),
  z.literal("dash-64k-audio"),
  z.literal("dash-720p-video"),
  z.literal("empty"),
  z.literal("flac"),
  z.literal("flash"),
  z.literal("gif"),
  z.literal("hevc"),
  z.literal("hls/1080p"),
  z.literal("hls/270p"),
  z.literal("hls/360p"),
  z.literal("hls/480p"),
  z.literal("hls/4k"),
  z.literal("hls/540p"),
  z.literal("hls/720p"),
  z.literal("hls-1080p"),
  z.literal("hls-270p"),
  z.literal("hls-360p"),
  z.literal("hls-480p"),
  z.literal("hls-540p"),
  z.literal("hls-576p"),
  z.literal("hls-720p"),
  z.literal("ipad-high"),
  z.literal("ipad-low"),
  z.literal("ipad"),
  z.literal("iphone-high"),
  z.literal("iphone-low"),
  z.literal("iphone"),
  z.literal("mp3"),
  z.literal("ogg"),
  z.literal("ogv"),
  z.literal("opus"),
  z.literal("speech"),
  z.literal("wav"),
  z.literal("web/mp4/1080p"),
  z.literal("web/mp4/240p"),
  z.literal("web/mp4/360p"),
  z.literal("web/mp4/480p"),
  z.literal("web/mp4/4k"),
  z.literal("web/mp4/720p"),
  z.literal("web/mp4-x265/1080p"),
  z.literal("web/mp4-x265/240p"),
  z.literal("web/mp4-x265/360p"),
  z.literal("web/mp4-x265/480p"),
  z.literal("web/mp4-x265/4k"),
  z.literal("web/mp4-x265/720p"),
  z.literal("web/mp4-x265/8k"),
  z.literal("web/webm/1080p"),
  z.literal("web/webm/240p"),
  z.literal("web/webm/360p"),
  z.literal("web/webm/480p"),
  z.literal("web/webm/4k"),
  z.literal("web/webm/720p"),
  z.literal("web/webm/8k"),
  z.literal("webm-1080p"),
  z.literal("webm-270p"),
  z.literal("webm-360p"),
  z.literal("webm-480p"),
  z.literal("webm-540p"),
  z.literal("webm-576p"),
  z.literal("webm-720p"),
  z.literal("webm"),
  z.literal("wmv"),
])

export const ffmpeg_v5_0_0_presets = z.union([
  z.literal("aac"),
  z.literal("alac"),
  z.literal("android-high"),
  z.literal("android-low"),
  z.literal("android"),
  z.literal("audio/aac"),
  z.literal("audio/alac"),
  z.literal("audio/flac"),
  z.literal("audio/mp3"),
  z.literal("audio/ogg"),
  z.literal("dash/1080p-video"),
  z.literal("dash/128k-audio"),
  z.literal("dash/256k-audio"),
  z.literal("dash/270p-video"),
  z.literal("dash/32k-audio"),
  z.literal("dash/360p-video"),
  z.literal("dash/480p-video"),
  z.literal("dash/540p-video"),
  z.literal("dash/576p-video"),
  z.literal("dash/64k-audio"),
  z.literal("dash/720p-video"),
  z.literal("dash-1080p-video"),
  z.literal("dash-128k-audio"),
  z.literal("dash-256k-audio"),
  z.literal("dash-270p-video"),
  z.literal("dash-32k-audio"),
  z.literal("dash-360p-video"),
  z.literal("dash-480p-video"),
  z.literal("dash-540p-video"),
  z.literal("dash-576p-video"),
  z.literal("dash-64k-audio"),
  z.literal("dash-720p-video"),
  z.literal("empty"),
  z.literal("flac"),
  z.literal("flash"),
  z.literal("gif"),
  z.literal("hevc"),
  z.literal("hls/1080p"),
  z.literal("hls/270p"),
  z.literal("hls/360p"),
  z.literal("hls/480p"),
  z.literal("hls/4k"),
  z.literal("hls/540p"),
  z.literal("hls/720p"),
  z.literal("hls-1080p"),
  z.literal("hls-270p"),
  z.literal("hls-360p"),
  z.literal("hls-480p"),
  z.literal("hls-540p"),
  z.literal("hls-576p"),
  z.literal("hls-720p"),
  z.literal("ipad-high"),
  z.literal("ipad-low"),
  z.literal("ipad"),
  z.literal("iphone-high"),
  z.literal("iphone-low"),
  z.literal("iphone"),
  z.literal("mp3"),
  z.literal("ogg"),
  z.literal("ogv"),
  z.literal("opus"),
  z.literal("speech"),
  z.literal("wav"),
  z.literal("web/mp4/1080p"),
  z.literal("web/mp4/240p"),
  z.literal("web/mp4/360p"),
  z.literal("web/mp4/480p"),
  z.literal("web/mp4/4k"),
  z.literal("web/mp4/720p"),
  z.literal("web/mp4-x265/1080p"),
  z.literal("web/mp4-x265/240p"),
  z.literal("web/mp4-x265/360p"),
  z.literal("web/mp4-x265/480p"),
  z.literal("web/mp4-x265/4k"),
  z.literal("web/mp4-x265/720p"),
  z.literal("web/mp4-x265/8k"),
  z.literal("web/webm/1080p"),
  z.literal("web/webm/240p"),
  z.literal("web/webm/360p"),
  z.literal("web/webm/480p"),
  z.literal("web/webm/4k"),
  z.literal("web/webm/720p"),
  z.literal("web/webm/8k"),
  z.literal("webm-1080p"),
  z.literal("webm-270p"),
  z.literal("webm-360p"),
  z.literal("webm-480p"),
  z.literal("webm-540p"),
  z.literal("webm-576p"),
  z.literal("webm-720p"),
  z.literal("webm"),
  z.literal("wmv"),
])

const presets_description = ` You can override any preset's setting, such as a file's bitrate, or even the file's format & codecs via a Robot's \`ffmpeg\` parameter.  The \`hls-\` and \`dash-\` presets are intended for use in combination with \`🤖/video/adaptive\`. `

export const ffmpeg_v3_3_3 = z.object({
  ffmpeg_stack: z.literal("v3.3.3").optional(),
  preset: ffmpeg_v3_3_3_presets.describe(presets_description).optional(),
})

export const ffmpeg_v4_3_1 = z.object({
  ffmpeg_stack: z.literal("v4.3.1").optional(),
  preset: ffmpeg_v4_3_1_presets.describe(presets_description).optional(),
})

export const ffmpeg_v5_0_0 = z.object({
  ffmpeg_stack: z.literal("v5.0.0").optional(),
  preset: ffmpeg_v5_0_0_presets.describe(presets_description).optional(),
})

export const ffmpeg_stack = z
  .discriminatedUnion("ffmpeg_stack", [ffmpeg_v3_3_3, ffmpeg_v4_3_1, ffmpeg_v5_0_0])
  .default({ ffmpeg_stack: "v3.3.3", preset: "flash" })
