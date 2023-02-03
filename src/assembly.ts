import { z } from "zod"

import { audioArtworkRobotSchema } from "./robots/audio-encoding/audio-artwork"
import { audioConcatRobotSchema } from "./robots/audio-encoding/audio-concat"
import { audioEncodeRobotSchema } from "./robots/audio-encoding/audio-encode"
import { audioLoopRobotSchema } from "./robots/audio-encoding/audio-loop"
import { audioMergeRobotSchema } from "./robots/audio-encoding/audio-merge"
import { audioWaveformRobotSchema } from "./robots/audio-encoding/audio-waveform"
import { azureImportRobotSchema } from "./robots/file-importing/azure-import"
import { azureStoreRobotSchema } from "./robots/file-exporting/azure-store"
import { backblazeImportRobotSchema } from "./robots/file-importing/backblaze-import"
import { backblazeStoreRobotSchema } from "./robots/file-exporting/backblaze-store"
import { cloudfilesImportRobotSchema } from "./robots/file-importing/cloudfiles-import"
import { cloudfilesStoreRobotSchema } from "./robots/file-exporting/cloudfiles-store"
import { digitaloceanImportRobotSchema } from "./robots/file-importing/digitalocean-import"
import { digitaloceanStoreRobotSchema } from "./robots/file-exporting/digitalocean-store"
import { documentConvertRobotSchema } from "./robots/document-processing/document-convert"
import { documentThumbsRobotSchema } from "./robots/document-processing/document-thumbs"
import { dropboxImportRobotSchema } from "./robots/file-importing/dropbox-import"
import { dropboxStoreRobotSchema } from "./robots/file-exporting/dropbox-store"
import { fileCompressRobotSchema } from "./robots/file-compressing/file-compress"
import { fileDecompressRobotSchema } from "./robots/file-compressing/file-decompress"
import { fileFilterRobotSchema } from "./robots/file-filtering/file-filter"
import { fileHashRobotSchema } from "./robots/media-cataloging/file-hash"
import { fileServeRobotSchema } from "./robots/content-delivery/file-serve"
import { fileVirusscanRobotSchema } from "./robots/file-filtering/file-virusscan"
import { ftpImportRobotSchema } from "./robots/file-importing/ftp-import"
import { ftpStoreRobotSchema } from "./robots/file-exporting/ftp-store"
import { googleImportRobotSchema } from "./robots/file-importing/google-import"
import { googleStoreRobotSchema } from "./robots/file-exporting/google-store"
import { htmlConvertRobotSchema } from "./robots/document-processing/html-convert"
import { httpImportRobotSchema } from "./robots/file-importing/http-import"
import { imageDescribeRobotSchema } from "./robots/artificial-intelligence/image-describe"
import { imageFacedetectRobotSchema } from "./robots/artificial-intelligence/image-facedetect"
import { imageMergeRobotSchema } from "./robots/image-manipulation/image-merge"
import { imageOcrRobotSchema } from "./robots/artificial-intelligence/image-ocr"
import { imageOptimizeRobotSchema } from "./robots/image-manipulation/image-optimize"
import { imageResizeRobotSchema } from "./robots/image-manipulation/image-resize"
import { mediaPlaylistRobotSchema } from "./robots/media-cataloging/media-playlist"
import { metaWriteRobotSchema } from "./robots/media-cataloging/meta-write"
import { minioImportRobotSchema } from "./robots/file-importing/minio-import"
import { minioStoreRobotSchema } from "./robots/file-exporting/minio-store"
import { s3ImportRobotSchema } from "./robots/file-importing/s3-import"
import { s3StoreRobotSchema } from "./robots/file-exporting/s3-store"
import { scriptRunRobotSchema } from "./robots/code-evaluation/script-run"
import { sftpImportRobotSchema } from "./robots/file-importing/sftp-import"
import { sftpStoreRobotSchema } from "./robots/file-exporting/sftp-store"
import { speechTranscribeRobotSchema } from "./robots/artificial-intelligence/speech-transcribe"
import { swiftImportRobotSchema } from "./robots/file-importing/swift-import"
import { swiftStoreRobotSchema } from "./robots/file-exporting/swift-store"
import { textSpeakRobotSchema } from "./robots/artificial-intelligence/text-speak"
import { textTranslateRobotSchema } from "./robots/artificial-intelligence/text-translate"
import { uploadHandleRobotSchema } from "./robots/handling-uploads/upload-handle"
import { videoAdaptiveRobotSchema } from "./robots/video-encoding/video-adaptive"
import { videoConcatRobotSchema } from "./robots/video-encoding/video-concat"
import { videoEncodeRobotSchema } from "./robots/video-encoding/video-encode"
import { videoMergeRobotSchema } from "./robots/video-encoding/video-merge"
import { videoSubtitleRobotSchema } from "./robots/video-encoding/video-subtitle"
import { videoThumbsRobotSchema } from "./robots/video-encoding/video-thumbs"
import { vimeoStoreRobotSchema } from "./robots/file-exporting/vimeo-store"
import { wasabiImportRobotSchema } from "./robots/file-importing/wasabi-import"
import { wasabiStoreRobotSchema } from "./robots/file-exporting/wasabi-store"
import { youtubeStoreRobotSchema } from "./robots/file-exporting/youtube-store"

export const assemblySchema = z.object({
  steps: z
    .record(
      z.union([
        audioArtworkRobotSchema,
        audioConcatRobotSchema,
        audioEncodeRobotSchema,
        audioLoopRobotSchema,
        audioMergeRobotSchema,
        audioWaveformRobotSchema,
        azureImportRobotSchema,
        azureStoreRobotSchema,
        backblazeImportRobotSchema,
        backblazeStoreRobotSchema,
        cloudfilesImportRobotSchema,
        cloudfilesStoreRobotSchema,
        digitaloceanImportRobotSchema,
        digitaloceanStoreRobotSchema,
        documentConvertRobotSchema,
        documentThumbsRobotSchema,
        dropboxImportRobotSchema,
        dropboxStoreRobotSchema,
        fileCompressRobotSchema,
        fileDecompressRobotSchema,
        fileFilterRobotSchema,
        fileHashRobotSchema,
        fileServeRobotSchema,
        fileVirusscanRobotSchema,
        ftpImportRobotSchema,
        ftpStoreRobotSchema,
        googleImportRobotSchema,
        googleStoreRobotSchema,
        htmlConvertRobotSchema,
        httpImportRobotSchema,
        imageDescribeRobotSchema,
        imageFacedetectRobotSchema,
        imageMergeRobotSchema,
        imageOcrRobotSchema,
        imageOptimizeRobotSchema,
        imageResizeRobotSchema,
        mediaPlaylistRobotSchema,
        metaWriteRobotSchema,
        minioImportRobotSchema,
        minioStoreRobotSchema,
        s3ImportRobotSchema,
        s3StoreRobotSchema,
        scriptRunRobotSchema,
        sftpImportRobotSchema,
        sftpStoreRobotSchema,
        speechTranscribeRobotSchema,
        swiftImportRobotSchema,
        swiftStoreRobotSchema,
        textSpeakRobotSchema,
        textTranslateRobotSchema,
        uploadHandleRobotSchema,
        videoAdaptiveRobotSchema,
        videoConcatRobotSchema,
        videoEncodeRobotSchema,
        videoMergeRobotSchema,
        videoSubtitleRobotSchema,
        videoThumbsRobotSchema,
        vimeoStoreRobotSchema,
        wasabiImportRobotSchema,
        wasabiStoreRobotSchema,
        youtubeStoreRobotSchema,
      ])
    )
    .refine(
      (val) => {
        const keys = Object.keys(val)
        if (keys.includes(":original")) {
          return keys[0] === ":original"
        }
        return true
      },
      { message: `If \`:original\` is used, it should be the first step.` }
    )
    .refine(
      (val) => {
        const keys = Object.keys(val)
        if (keys.includes(":original")) {
          return val[":original"]?.robot === "/upload/handle"
        }
        return true
      },
      {
        message: `If \`:original\` is used, its robot should be \`/upload/handle\`.`,
      }
    )
    .refine(
      (val) => {
        const keys = Object.keys(val)
        if (keys.includes(":original")) {
          if ("use" in val[":original"]) return false
        }
        return true
      },
      { message: "If `:original` is used, it should not have a `use` parameter." }
    )
    .refine(
      (val) => {
        const robots = Object.values(val).map((step) => step.robot)
        return robots.filter((robot) => robot === "/upload/handle").length === 1
      },
      { message: "Only one step can use `/upload/handle`." }
    )
    .refine(
      (val) => {
        const steps = Object.values(val)
        steps?.shift()

        const stepNames = Object.keys(val)

        return steps.every((step) => {
          if (!("use" in step)) return true

          if (typeof step?.use === "string") return stepNames.includes(step.use)

          if (Array.isArray(step?.use)) {
            return step.use.every((use) => stepNames.includes(use))
          }

          if (typeof step?.use === "object") {
            return step.use.steps.every((s) =>
              stepNames.includes(typeof s === "string" ? s : s.name)
            )
          }
        })
      },
      { message: "Each step's `use` field should reference a previous step." }
    ),
})

export type Assembly = z.infer<typeof assemblySchema>
