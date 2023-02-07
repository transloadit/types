import { z } from "zod"

import { imageDescribeRobotSchema } from "./artificial-intelligence/image-describe.js"
import { imageFacedetectRobotSchema } from "./artificial-intelligence/image-facedetect.js"
import { imageOcrRobotSchema } from "./artificial-intelligence/image-ocr.js"
import { speechTranscribeRobotSchema } from "./artificial-intelligence/speech-transcribe.js"
import { textSpeakRobotSchema } from "./artificial-intelligence/text-speak.js"
import { textTranslateRobotSchema } from "./artificial-intelligence/text-translate.js"
import { audioArtworkRobotSchema } from "./audio-encoding/audio-artwork.js"
import { audioConcatRobotSchema } from "./audio-encoding/audio-concat.js"
import { audioEncodeRobotSchema } from "./audio-encoding/audio-encode.js"
import { audioLoopRobotSchema } from "./audio-encoding/audio-loop.js"
import { audioMergeRobotSchema } from "./audio-encoding/audio-merge.js"
import { audioWaveformRobotSchema } from "./audio-encoding/audio-waveform.js"
import { scriptRunRobotSchema } from "./code-evaluation/script-run.js"
import { fileServeRobotSchema } from "./content-delivery/file-serve.js"
import { documentConvertRobotSchema } from "./document-processing/document-convert.js"
import { documentThumbsRobotSchema } from "./document-processing/document-thumbs.js"
import { htmlConvertRobotSchema } from "./document-processing/html-convert.js"
import { fileCompressRobotSchema } from "./file-compressing/file-compress.js"
import { fileDecompressRobotSchema } from "./file-compressing/file-decompress.js"
import { azureStoreRobotSchema } from "./file-exporting/azure-store.js"
import { backblazeStoreRobotSchema } from "./file-exporting/backblaze-store.js"
import { cloudfilesStoreRobotSchema } from "./file-exporting/cloudfiles-store.js"
import { digitaloceanStoreRobotSchema } from "./file-exporting/digitalocean-store.js"
import { dropboxStoreRobotSchema } from "./file-exporting/dropbox-store.js"
import { ftpStoreRobotSchema } from "./file-exporting/ftp-store.js"
import { googleStoreRobotSchema } from "./file-exporting/google-store.js"
import { minioStoreRobotSchema } from "./file-exporting/minio-store.js"
import { s3StoreRobotSchema } from "./file-exporting/s3-store.js"
import { sftpStoreRobotSchema } from "./file-exporting/sftp-store.js"
import { swiftStoreRobotSchema } from "./file-exporting/swift-store.js"
import { vimeoStoreRobotSchema } from "./file-exporting/vimeo-store.js"
import { wasabiStoreRobotSchema } from "./file-exporting/wasabi-store.js"
import { youtubeStoreRobotSchema } from "./file-exporting/youtube-store.js"
import { fileFilterRobotSchema } from "./file-filtering/file-filter.js"
import { fileVirusscanRobotSchema } from "./file-filtering/file-virusscan.js"
import { azureImportRobotSchema } from "./file-importing/azure-import.js"
import { backblazeImportRobotSchema } from "./file-importing/backblaze-import.js"
import { cloudfilesImportRobotSchema } from "./file-importing/cloudfiles-import.js"
import { digitaloceanImportRobotSchema } from "./file-importing/digitalocean-import.js"
import { dropboxImportRobotSchema } from "./file-importing/dropbox-import.js"
import { ftpImportRobotSchema } from "./file-importing/ftp-import.js"
import { googleImportRobotSchema } from "./file-importing/google-import.js"
import { httpImportRobotSchema } from "./file-importing/http-import.js"
import { minioImportRobotSchema } from "./file-importing/minio-import.js"
import { s3ImportRobotSchema } from "./file-importing/s3-import.js"
import { sftpImportRobotSchema } from "./file-importing/sftp-import.js"
import { swiftImportRobotSchema } from "./file-importing/swift-import.js"
import { wasabiImportRobotSchema } from "./file-importing/wasabi-import.js"
import { uploadHandleRobotSchema } from "./handling-uploads/upload-handle.js"
import { imageMergeRobotSchema } from "./image-manipulation/image-merge.js"
import { imageOptimizeRobotSchema } from "./image-manipulation/image-optimize.js"
import { imageResizeRobotSchema } from "./image-manipulation/image-resize.js"
import { fileHashRobotSchema } from "./media-cataloging/file-hash.js"
import { mediaPlaylistRobotSchema } from "./media-cataloging/media-playlist.js"
import { metaWriteRobotSchema } from "./media-cataloging/meta-write.js"
import { videoAdaptiveRobotSchema } from "./video-encoding/video-adaptive.js"
import { videoConcatRobotSchema } from "./video-encoding/video-concat.js"
import { videoEncodeRobotSchema } from "./video-encoding/video-encode.js"
import { videoMergeRobotSchema } from "./video-encoding/video-merge.js"
import { videoSubtitleRobotSchema } from "./video-encoding/video-subtitle.js"
import { videoThumbsRobotSchema } from "./video-encoding/video-thumbs.js"

import type { ImageDescribeRobot } from "./artificial-intelligence/image-describe.js"
import type { ImageFacedetectRobot } from "./artificial-intelligence/image-facedetect.js"
import type { ImageOcrRobot } from "./artificial-intelligence/image-ocr.js"
import type { SpeechTranscribeRobot } from "./artificial-intelligence/speech-transcribe.js"
import type { TextSpeakRobot } from "./artificial-intelligence/text-speak.js"
import type { TextTranslateRobot } from "./artificial-intelligence/text-translate.js"
import type { AudioArtworkRobot } from "./audio-encoding/audio-artwork.js"
import type { AudioConcatRobot } from "./audio-encoding/audio-concat.js"
import type { AudioEncodeRobot } from "./audio-encoding/audio-encode.js"
import type { AudioLoopRobot } from "./audio-encoding/audio-loop.js"
import type { AudioMergeRobot } from "./audio-encoding/audio-merge.js"
import type { AudioWaveformRobot } from "./audio-encoding/audio-waveform.js"
import type { ScriptRunRobot } from "./code-evaluation/script-run.js"
import type { FileServeRobot } from "./content-delivery/file-serve.js"
import type { DocumentConvertRobot } from "./document-processing/document-convert.js"
import type { DocumentThumbsRobot } from "./document-processing/document-thumbs.js"
import type { HtmlConvertRobot } from "./document-processing/html-convert.js"
import type { FileCompressRobot } from "./file-compressing/file-compress.js"
import type { FileDecompressRobot } from "./file-compressing/file-decompress.js"
import type { AzureStoreRobot } from "./file-exporting/azure-store.js"
import type { BackblazeStoreRobot } from "./file-exporting/backblaze-store.js"
import type { CloudfilesStoreRobot } from "./file-exporting/cloudfiles-store.js"
import type { DigitaloceanStoreRobot } from "./file-exporting/digitalocean-store.js"
import type { DropboxStoreRobot } from "./file-exporting/dropbox-store.js"
import type { FtpStoreRobot } from "./file-exporting/ftp-store.js"
import type { GoogleStoreRobot } from "./file-exporting/google-store.js"
import type { MinioStoreRobot } from "./file-exporting/minio-store.js"
import type { S3StoreRobot } from "./file-exporting/s3-store.js"
import type { SftpStoreRobot } from "./file-exporting/sftp-store.js"
import type { SwiftStoreRobot } from "./file-exporting/swift-store.js"
import type { VimeoStoreRobot } from "./file-exporting/vimeo-store.js"
import type { WasabiStoreRobot } from "./file-exporting/wasabi-store.js"
import type { YoutubeStoreRobot } from "./file-exporting/youtube-store.js"
import type { FileFilterRobot } from "./file-filtering/file-filter.js"
import type { FileVirusscanRobot } from "./file-filtering/file-virusscan.js"
import type { AzureImportRobot } from "./file-importing/azure-import.js"
import type { BackblazeImportRobot } from "./file-importing/backblaze-import.js"
import type { CloudfilesImportRobot } from "./file-importing/cloudfiles-import.js"
import type { DigitaloceanImportRobot } from "./file-importing/digitalocean-import.js"
import type { DropboxImportRobot } from "./file-importing/dropbox-import.js"
import type { FtpImportRobot } from "./file-importing/ftp-import.js"
import type { GoogleImportRobot } from "./file-importing/google-import.js"
import type { HttpImportRobot } from "./file-importing/http-import.js"
import type { MinioImportRobot } from "./file-importing/minio-import.js"
import type { S3ImportRobot } from "./file-importing/s3-import.js"
import type { SftpImportRobot } from "./file-importing/sftp-import.js"
import type { SwiftImportRobot } from "./file-importing/swift-import.js"
import type { WasabiImportRobot } from "./file-importing/wasabi-import.js"
import type { UploadHandleRobot } from "./handling-uploads/upload-handle.js"
import type { ImageMergeRobot } from "./image-manipulation/image-merge.js"
import type { ImageOptimizeRobot } from "./image-manipulation/image-optimize.js"
import type { ImageResizeRobot } from "./image-manipulation/image-resize.js"
import type { FileHashRobot } from "./media-cataloging/file-hash.js"
import type { MediaPlaylistRobot } from "./media-cataloging/media-playlist.js"
import type { MetaWriteRobot } from "./media-cataloging/meta-write.js"
import type { VideoAdaptiveRobot } from "./video-encoding/video-adaptive.js"
import type { VideoConcatRobot } from "./video-encoding/video-concat.js"
import type { VideoEncodeRobot } from "./video-encoding/video-encode.js"
import type { VideoMergeRobot } from "./video-encoding/video-merge.js"
import type { VideoSubtitleRobot } from "./video-encoding/video-subtitle.js"
import type { VideoThumbsRobot } from "./video-encoding/video-thumbs.js"

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

export {
  imageDescribeRobotSchema,
  imageFacedetectRobotSchema,
  imageOcrRobotSchema,
  speechTranscribeRobotSchema,
  textSpeakRobotSchema,
  textTranslateRobotSchema,
  audioArtworkRobotSchema,
  audioConcatRobotSchema,
  audioEncodeRobotSchema,
  audioLoopRobotSchema,
  audioMergeRobotSchema,
  audioWaveformRobotSchema,
  scriptRunRobotSchema,
  fileServeRobotSchema,
  documentConvertRobotSchema,
  documentThumbsRobotSchema,
  htmlConvertRobotSchema,
  fileCompressRobotSchema,
  fileDecompressRobotSchema,
  azureStoreRobotSchema,
  backblazeStoreRobotSchema,
  cloudfilesStoreRobotSchema,
  digitaloceanStoreRobotSchema,
  dropboxStoreRobotSchema,
  ftpStoreRobotSchema,
  googleStoreRobotSchema,
  minioStoreRobotSchema,
  s3StoreRobotSchema,
  sftpStoreRobotSchema,
  swiftStoreRobotSchema,
  vimeoStoreRobotSchema,
  wasabiStoreRobotSchema,
  youtubeStoreRobotSchema,
  fileFilterRobotSchema,
  fileVirusscanRobotSchema,
  azureImportRobotSchema,
  backblazeImportRobotSchema,
  cloudfilesImportRobotSchema,
  digitaloceanImportRobotSchema,
  dropboxImportRobotSchema,
  ftpImportRobotSchema,
  googleImportRobotSchema,
  httpImportRobotSchema,
  minioImportRobotSchema,
  s3ImportRobotSchema,
  sftpImportRobotSchema,
  swiftImportRobotSchema,
  wasabiImportRobotSchema,
  uploadHandleRobotSchema,
  imageMergeRobotSchema,
  imageOptimizeRobotSchema,
  imageResizeRobotSchema,
  fileHashRobotSchema,
  mediaPlaylistRobotSchema,
  metaWriteRobotSchema,
  videoAdaptiveRobotSchema,
  videoConcatRobotSchema,
  videoEncodeRobotSchema,
  videoMergeRobotSchema,
  videoSubtitleRobotSchema,
  videoThumbsRobotSchema,
}

export type {
  ImageDescribeRobot,
  ImageFacedetectRobot,
  ImageOcrRobot,
  SpeechTranscribeRobot,
  TextSpeakRobot,
  TextTranslateRobot,
  AudioArtworkRobot,
  AudioConcatRobot,
  AudioEncodeRobot,
  AudioLoopRobot,
  AudioMergeRobot,
  AudioWaveformRobot,
  ScriptRunRobot,
  FileServeRobot,
  DocumentConvertRobot,
  DocumentThumbsRobot,
  HtmlConvertRobot,
  FileCompressRobot,
  FileDecompressRobot,
  AzureStoreRobot,
  BackblazeStoreRobot,
  CloudfilesStoreRobot,
  DigitaloceanStoreRobot,
  DropboxStoreRobot,
  FtpStoreRobot,
  GoogleStoreRobot,
  MinioStoreRobot,
  S3StoreRobot,
  SftpStoreRobot,
  SwiftStoreRobot,
  VimeoStoreRobot,
  WasabiStoreRobot,
  YoutubeStoreRobot,
  FileFilterRobot,
  FileVirusscanRobot,
  AzureImportRobot,
  BackblazeImportRobot,
  CloudfilesImportRobot,
  DigitaloceanImportRobot,
  DropboxImportRobot,
  FtpImportRobot,
  GoogleImportRobot,
  HttpImportRobot,
  MinioImportRobot,
  S3ImportRobot,
  SftpImportRobot,
  SwiftImportRobot,
  WasabiImportRobot,
  UploadHandleRobot,
  ImageMergeRobot,
  ImageOptimizeRobot,
  ImageResizeRobot,
  FileHashRobot,
  MediaPlaylistRobot,
  MetaWriteRobot,
  VideoAdaptiveRobot,
  VideoConcatRobot,
  VideoEncodeRobot,
  VideoMergeRobot,
  VideoSubtitleRobot,
  VideoThumbsRobot,
}
