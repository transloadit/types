import * as z from "zod";
import { importAzureRobotSchema } from "./robots/import-azure";
import { importBackblazeRobotSchema } from "./robots/import-backblaze";
import { importRackspaceCloudfilesRobotSchema } from "./robots/import-cloudfiles";
import { importDigitalOceanRobotSchema } from "./robots/import-digitalocean";
import { importDropboxRobotSchema } from "./robots/import-dropbox";
import { importFtpRobotSchema } from "./robots/import-ftp";
import { importGoogleStorageRobotSchema } from "./robots/import-google";
import { importHttpRobotSchema } from "./robots/import-http";
import { uploadHandleRobotSchema } from "./robots/upload-handle";

export const assemblySchema = z.object({
  steps: z
    .record(
      z.discriminatedUnion("robot", [
        uploadHandleRobotSchema,
        importAzureRobotSchema,
        importBackblazeRobotSchema,
        importDigitalOceanRobotSchema,
        importDropboxRobotSchema,
        importFtpRobotSchema,
        importGoogleStorageRobotSchema,
        importHttpRobotSchema,
        importRackspaceCloudfilesRobotSchema,
      ])
    )
    .refine(
      (val) => {
        const keys = Object.keys(val);
        if (keys.includes(":original")) {
          return keys[0] === ":original";
        }
        return true;
      },
      { message: `If \`:original\` is used, it should be the first step.` }
    )
    .refine(
      (val) => {
        const keys = Object.keys(val);
        if (keys.includes(":original")) {
          return val[":original"]?.robot === "/upload/handle";
        }
        return true;
      },
      {
        message: `If \`:original\` is used, its robot should be \`/upload/handle\`.`,
      }
    )
    .refine(
      (val) => {
        const keys = Object.keys(val);
        if (keys.includes(":original")) {
          return val[":original"]?.use === undefined;
        }
        return true;
      },
      { message: "If `:original` is used, it should not have a `use` parameter." }
    )
    .refine(
      (val) => {
        const robots = Object.values(val).map((step) => step.robot);
        return robots.filter((robot) => robot === "/upload/handle").length === 1;
      },
      { message: "Only one step can use `/upload/handle`." }
    )
    .refine(
      (val) => {
        const steps = Object.values(val);
        steps?.shift();

        const stepNames = Object.keys(val);

        return steps.every((step) => {
          if (typeof step?.use === "string") return stepNames.includes(step.use);

          if (Array.isArray(step?.use)) {
            return step.use.every((use) => stepNames.includes(use));
          }

          if (typeof step?.use === "object") {
            return step.use.steps.every((s) =>
              stepNames.includes(typeof s === "string" ? s : s.name)
            );
          }
        });
      },
      { message: "Each step's `use` field should reference a previous step." }
    ),
});

export type Assembly = z.infer<typeof assemblySchema>;
