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

import type { ImageDescribeRobot } from "./artificial-intelligence/image-describe"
import type { ImageFacedetectRobot } from "./artificial-intelligence/image-facedetect"
import type { ImageOcrRobot } from "./artificial-intelligence/image-ocr"
import type { SpeechTranscribeRobot } from "./artificial-intelligence/speech-transcribe"
import type { TextSpeakRobot } from "./artificial-intelligence/text-speak"
import type { TextTranslateRobot } from "./artificial-intelligence/text-translate"
import type { AudioArtworkRobot } from "./audio-encoding/audio-artwork"
import type { AudioConcatRobot } from "./audio-encoding/audio-concat"
import type { AudioEncodeRobot } from "./audio-encoding/audio-encode"
import type { AudioLoopRobot } from "./audio-encoding/audio-loop"
import type { AudioMergeRobot } from "./audio-encoding/audio-merge"
import type { AudioWaveformRobot } from "./audio-encoding/audio-waveform"
import type { ScriptRunRobot } from "./code-evaluation/script-run"
import type { FileServeRobot } from "./content-delivery/file-serve"
import type { DocumentConvertRobot } from "./document-processing/document-convert"
import type { DocumentThumbsRobot } from "./document-processing/document-thumbs"
import type { HtmlConvertRobot } from "./document-processing/html-convert"
import type { FileCompressRobot } from "./file-compressing/file-compress"
import type { FileDecompressRobot } from "./file-compressing/file-decompress"
import type { AzureStoreRobot } from "./file-exporting/azure-store"
import type { BackblazeStoreRobot } from "./file-exporting/backblaze-store"
import type { CloudfilesStoreRobot } from "./file-exporting/cloudfiles-store"
import type { DigitaloceanStoreRobot } from "./file-exporting/digitalocean-store"
import type { DropboxStoreRobot } from "./file-exporting/dropbox-store"
import type { FtpStoreRobot } from "./file-exporting/ftp-store"
import type { GoogleStoreRobot } from "./file-exporting/google-store"
import type { MinioStoreRobot } from "./file-exporting/minio-store"
import type { S3StoreRobot } from "./file-exporting/s3-store"
import type { SftpStoreRobot } from "./file-exporting/sftp-store"
import type { SwiftStoreRobot } from "./file-exporting/swift-store"
import type { VimeoStoreRobot } from "./file-exporting/vimeo-store"
import type { WasabiStoreRobot } from "./file-exporting/wasabi-store"
import type { YoutubeStoreRobot } from "./file-exporting/youtube-store"
import type { FileFilterRobot } from "./file-filtering/file-filter"
import type { FileVirusscanRobot } from "./file-filtering/file-virusscan"
import type { AzureImportRobot } from "./file-importing/azure-import"
import type { BackblazeImportRobot } from "./file-importing/backblaze-import"
import type { CloudfilesImportRobot } from "./file-importing/cloudfiles-import"
import type { DigitaloceanImportRobot } from "./file-importing/digitalocean-import"
import type { DropboxImportRobot } from "./file-importing/dropbox-import"
import type { FtpImportRobot } from "./file-importing/ftp-import"
import type { GoogleImportRobot } from "./file-importing/google-import"
import type { HttpImportRobot } from "./file-importing/http-import"
import type { MinioImportRobot } from "./file-importing/minio-import"
import type { S3ImportRobot } from "./file-importing/s3-import"
import type { SftpImportRobot } from "./file-importing/sftp-import"
import type { SwiftImportRobot } from "./file-importing/swift-import"
import type { WasabiImportRobot } from "./file-importing/wasabi-import"
import type { UploadHandleRobot } from "./handling-uploads/upload-handle"
import type { ImageMergeRobot } from "./image-manipulation/image-merge"
import type { ImageOptimizeRobot } from "./image-manipulation/image-optimize"
import type { ImageResizeRobot } from "./image-manipulation/image-resize"
import type { FileHashRobot } from "./media-cataloging/file-hash"
import type { MediaPlaylistRobot } from "./media-cataloging/media-playlist"
import type { MetaWriteRobot } from "./media-cataloging/meta-write"
import type { VideoAdaptiveRobot } from "./video-encoding/video-adaptive"
import type { VideoConcatRobot } from "./video-encoding/video-concat"
import type { VideoEncodeRobot } from "./video-encoding/video-encode"
import type { VideoMergeRobot } from "./video-encoding/video-merge"
import type { VideoSubtitleRobot } from "./video-encoding/video-subtitle"
import type { VideoThumbsRobot } from "./video-encoding/video-thumbs"

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
