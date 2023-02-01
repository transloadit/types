import * as z from "zod";
import { credentialsSchema } from "../shared/credentials";
import { ignoreErrorsSchema } from "../shared/ignore-errors";
import { files_per_page, next_page_token, recursive } from "../shared/pagination";
import { pathSchema } from "../shared/path";

export const importGoogleStorageRobotSchema = z.object({
  robot: z.literal("/google/import"),
  credentials: credentialsSchema.describe(
    `Create a new [Google service account](https://cloud.google.com/storage/docs/authentication). Set its role to "Storage Object Creator". Choose "JSON" for the key file format and download it to your computer. You will need to upload this file when creating your Template Credentials. 
    
Go back to your Google credentials project and enable the "Google Cloud Storage JSON API" for it. Wait around ten minutes for the action to propagate through the Google network. Grab the project ID from the dropdown menu in the header bar on the Google site. You will also need it later on.

Now you can set up the \`storage.objects.create\` and \`storage.objects.delete\` permissions. The latter is optional and only required if you intend to overwrite existing paths.

To do this from the Google Cloud console, navigate to "IAM & Admin" and select "Roles". From here, select "+CREATE ROLE", enter a name, set the role launch stage as general availability and set the permissions stated above.

Next, relocate to your storage browser and select the ellipsis on your bucket to edit bucket permissions. From here, select "ADD MEMBER", enter your service account as a new member and select your newly created role.

Then, create your associated Template Credentials in your Transloadit account and use the name of your Template Credentials as this parameter's value.`
  ),
  path: pathSchema.describe(`The path in your bucket to the specific file or directory. If the path points to a file, only this file will be imported. 
  
If it points to a directory, indicated by a trailing slash (\`/\`), then all files that are direct descendants of this directory will be imported.

Directories are **not** imported recursively. If you want to import files from subdirectories and sub-subdirectories, enable the \`recursive\` parameter.

If you want to import all files from the root directory, please use \`/\` as the value here. In this case, make sure all your objects belong to a path. If you have objects in the root of your bucket that aren't prefixed with \`/\`, you'll receive a \`404 GOOGLE_IMPORT_NOT_FOUND\` error.

You can also use an array of path strings here to import multiple paths in the same Robot's Step.`),
  recursive: z.optional(recursive),
  next_page_token: z.optional(next_page_token),
  files_per_page: z.optional(files_per_page),
  ignore_errors: ignoreErrorsSchema,
});

export type ImportGoogleStorageRobot = z.infer<typeof importGoogleStorageRobotSchema>;
