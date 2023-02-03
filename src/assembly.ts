import { z } from "zod"
import { importAzureRobotSchema } from "./robots/file-importing/import-azure"
import { importBackblazeRobotSchema } from "./robots/file-importing/import-backblaze"
import { importRackspaceCloudfilesRobotSchema } from "./robots/file-importing/import-cloudfiles"
import { importDigitalOceanRobotSchema } from "./robots/file-importing/import-digitalocean"
import { importDropboxRobotSchema } from "./robots/file-importing/import-dropbox"
import { importFtpRobotSchema } from "./robots/file-importing/import-ftp"
import { importGoogleStorageRobotSchema } from "./robots/file-importing/import-google"
import { importHttpRobotSchema } from "./robots/file-importing/import-http"
import { importMinioRobotSchema } from "./robots/file-importing/import-minio"
import { importAmazonS3RobotSchema } from "./robots/file-importing/import-s3"
import { importSftpRobotSchema } from "./robots/file-importing/import-sftp"
import { uploadHandleRobotSchema } from "./robots/handling-uploads/upload-handle"
import { videoAdaptiveRobotSchema } from "./robots/video-encoding/video-adaptive"
import { videoConcatRobotSchema } from "./robots/video-encoding/video-concat"

export const assemblySchema = z.object({
  steps: z
    .record(
      z.union([
        uploadHandleRobotSchema,
        importAzureRobotSchema,
        importBackblazeRobotSchema,
        importDigitalOceanRobotSchema,
        importDropboxRobotSchema,
        importFtpRobotSchema,
        importGoogleStorageRobotSchema,
        importHttpRobotSchema,
        importRackspaceCloudfilesRobotSchema,
        importMinioRobotSchema,
        importAmazonS3RobotSchema,
        importSftpRobotSchema,
        videoAdaptiveRobotSchema,
        videoConcatRobotSchema,
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
