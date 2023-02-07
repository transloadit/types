import { z } from "zod"
import { imageDescribeRobotSchema } from "./artificial-intelligence/image-describe"
import { imageFacedetectRobotSchema } from "./artificial-intelligence/image-facedetect"
import { imageOcrRobotSchema } from "./artificial-intelligence/image-ocr"
import { speechTranscribeRobotSchema } from "./artificial-intelligence/speech-transcribe"
import { textSpeakRobotSchema } from "./artificial-intelligence/text-speak"
import { textTranslateRobotSchema } from "./artificial-intelligence/text-translate"
import { audioArtworkRobotSchema } from "./audio-encoding/audio-artwork"
import { audioConcatRobotSchema } from "./audio-encoding/audio-concat"
import { audioEncodeRobotSchema } from "./audio-encoding/audio-encode"
import { audioLoopRobotSchema } from "./audio-encoding/audio-loop"
import { audioMergeRobotSchema } from "./audio-encoding/audio-merge"
import { audioWaveformRobotSchema } from "./audio-encoding/audio-waveform"
import { scriptRunRobotSchema } from "./code-evaluation/script-run"
import { fileServeRobotSchema } from "./content-delivery/file-serve"
import { documentConvertRobotSchema } from "./document-processing/document-convert"
import { documentThumbsRobotSchema } from "./document-processing/document-thumbs"
import { htmlConvertRobotSchema } from "./document-processing/html-convert"
import { fileCompressRobotSchema } from "./file-compressing/file-compress"
import { fileDecompressRobotSchema } from "./file-compressing/file-decompress"
import { azureStoreRobotSchema } from "./file-exporting/azure-store"
import { backblazeStoreRobotSchema } from "./file-exporting/backblaze-store"
import { cloudfilesStoreRobotSchema } from "./file-exporting/cloudfiles-store"
import { digitaloceanStoreRobotSchema } from "./file-exporting/digitalocean-store"
import { dropboxStoreRobotSchema } from "./file-exporting/dropbox-store"
import { ftpStoreRobotSchema } from "./file-exporting/ftp-store"
import { googleStoreRobotSchema } from "./file-exporting/google-store"
import { minioStoreRobotSchema } from "./file-exporting/minio-store"
import { s3StoreRobotSchema } from "./file-exporting/s3-store"
import { sftpStoreRobotSchema } from "./file-exporting/sftp-store"
import { swiftStoreRobotSchema } from "./file-exporting/swift-store"
import { vimeoStoreRobotSchema } from "./file-exporting/vimeo-store"
import { wasabiStoreRobotSchema } from "./file-exporting/wasabi-store"
import { youtubeStoreRobotSchema } from "./file-exporting/youtube-store"
import { fileFilterRobotSchema } from "./file-filtering/file-filter"
import { fileVirusscanRobotSchema } from "./file-filtering/file-virusscan"
import { azureImportRobotSchema } from "./file-importing/azure-import"
import { backblazeImportRobotSchema } from "./file-importing/backblaze-import"
import { cloudfilesImportRobotSchema } from "./file-importing/cloudfiles-import"
import { digitaloceanImportRobotSchema } from "./file-importing/digitalocean-import"
import { dropboxImportRobotSchema } from "./file-importing/dropbox-import"
import { ftpImportRobotSchema } from "./file-importing/ftp-import"
import { googleImportRobotSchema } from "./file-importing/google-import"
import { httpImportRobotSchema } from "./file-importing/http-import"
import { minioImportRobotSchema } from "./file-importing/minio-import"
import { s3ImportRobotSchema } from "./file-importing/s3-import"
import { sftpImportRobotSchema } from "./file-importing/sftp-import"
import { swiftImportRobotSchema } from "./file-importing/swift-import"
import { wasabiImportRobotSchema } from "./file-importing/wasabi-import"
import { uploadHandleRobotSchema } from "./handling-uploads/upload-handle"
import { imageMergeRobotSchema } from "./image-manipulation/image-merge"
import { imageOptimizeRobotSchema } from "./image-manipulation/image-optimize"
import { imageResizeRobotSchema } from "./image-manipulation/image-resize"
import { fileHashRobotSchema } from "./media-cataloging/file-hash"
import { mediaPlaylistRobotSchema } from "./media-cataloging/media-playlist"
import { metaWriteRobotSchema } from "./media-cataloging/meta-write"
import { videoAdaptiveRobotSchema } from "./video-encoding/video-adaptive"
import { videoConcatRobotSchema } from "./video-encoding/video-concat"
import { videoEncodeRobotSchema } from "./video-encoding/video-encode"
import { videoMergeRobotSchema } from "./video-encoding/video-merge"
import { videoSubtitleRobotSchema } from "./video-encoding/video-subtitle"
import { videoThumbsRobotSchema } from "./video-encoding/video-thumbs"

export const robotSchema = z.union([
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

export type Robot = z.infer<typeof robotSchema>
