import { z } from "zod"

// 🤖/google/store

export const google_store_robot_schema = z
  .object({
    robot: z.literal("/google/store"),
    credentials: z.string()
      .describe(`Create a new [Google service account](https://cloud.google.com/storage/docs/authentication).
Set its role to "Storage Object Creator". Choose "JSON" for the key file
format and download it to your computer. You will need to upload this
file when creating your <dfn>Template Credentials</dfn>.

Go back to your Google credentials project and enable the "Google Cloud
Storage JSON API" for it. Wait around ten minutes for the action to
propagate through the Google network. Grab the project ID from the dropdown
menu in the header bar on the Google site. You will also need it later on.

Now you can set up the \`storage.objects.create\` and \`storage.objects.delete\`
permissions. The latter is optional and only required if you intend to
overwrite existing paths.

To do this from the Google Cloud console, navigate to "IAM & Admin" and select
"Roles". From here, select "+CREATE ROLE", enter a name, set the role launch
stage as general availability and set the permissions stated above.

Next, relocate to your storage browser and select the ellipsis on your
bucket to edit bucket permissions. From here, select "ADD MEMBER", enter your
service account as a new member and select your newly created role.

Then, create your associated [Template Credentials](https://transloadit.com/c/template-credentials/) in your Transloadit
account and use the name of your <dfn>Template Credentials</dfn>
as this parameter's value.
`),
    path: z.string().default("${unique_prefix}/${file.url_name}").optional()
      .describe(`The path at which the file is to be stored. This may include any available
[Assembly Variables](https://transloadit.com/docs/topics/assembly-instructions/#assembly-variables).
`),
    acl: z
      .enum([
        "public-read",
        "authenticated-read",
        "bucket-owner-full-control",
        "private",
        "project-private",
      ])
      .default("public-read")
      .optional().describe(`The permissions used for this file. This can be \`"public-read"\`,
\`"authenticated-read"\`, \`"bucket-owner-full-control"\`, \`"private"\` or
\`"project-private"\`.
`),
    use: z.union([z.string(), z.array(z.string()), z.record(z.string())])
      .describe(`Specifies which <dfn>Step</dfn>(s) to use as input.

- You can pick any names for Steps except \`":original"\` (reserved for user uploads handled by Transloadit)

- You can provide several Steps as input with arrays:

  \`\`\`json
  "use": [
    ":original",
    "encoded",
    "resized"
  ]
  \`\`\`

💡 That’s likely all you need to know about \`use\`, but you can view advanced use
cases:

<details>
  <summary class="summary">› Advanced use cases</summary>

- **Step bundling**. Some <dfn>Robots</dfn> can gather several <dfn>Step</dfn> results for a single invocation. For example, [🤖/file/compress](https://transloadit.com/docs/transcoding/file-compressing/file-compress/) would normally create one archive for each file passed to it. If you'd set \`bundle_steps\` to true, however, it will create one archive containing all the result files from all <dfn>Steps</dfn> you give it. To enable bundling, provide an object like the one below to the \`use\` parameter:

  \`\`\`json
  "use": {
    "steps": [
      ":original",
      "encoded",
      "resized"
    ],
    "bundle_steps": true
  }
  \`\`\`

  This is also a crucial parameter
  for [🤖/video/adaptive](https://transloadit.com/docs/transcoding/video-encoding/video-adaptive/),
  otherwise you'll generate 1 playlist for each viewing quality. <br />
  Keep in
  mind that all input <dfn>Steps</dfn> must be present in your
  <dfn>Template</dfn>. If one of them is missing (for instance it is rejected by a filter), no result is generated because the
  <dfn>Robot</dfn> waits indefinitely for all input <dfn>Steps</dfn> to be
  finished.

  Here’s a [demo](https://transloadit.com/demos/document-processing/generate-html-based-artwork-and-overlay-on-video/)
  that showcases <dfn>Step</dfn> bundling.

- **Group by original.** Sticking with [🤖/file/compress](https://transloadit.com/docs/transcoding/file-compressing/file-compress/) example, you can set
  \`group_by_original\` to \`true\`, in order to create a separate archive
  for each of your uploaded or imported files, instead of
  creating one archive containing all originals (or one per resulting file). This is important for
  for 🤖/media/playlist where you'd typically
  set:

  \`\`\`json
  "use": {
    "steps": [
      "segmented"
    ],
    "bundle_steps": true,
    "group_by_original": true
  }
  \`\`\`

- **Fields.** You can be more discriminatory by only using files that match a field name by
  setting the \`fields\` property. When this array is specified, the
  corresponding <dfn>Step</dfn> will only be
  executed for files submitted through one of the given field names, which
  correspond with the strings in the \`name\` attribute of the HTML file input field
  tag for instance. When using a back-end SDK, it corresponds with \`myFieldName1\` in
  e.g.: \`$transloadit->addFile('myFieldName1', './chameleon.jpg')\`.

  This parameter is set to \`true\` by default, meaning all
  fields are accepted.

  Example:

  \`\`\`json
  "use": {
    "steps": [ ":original" ],
    "fields": [ "myFieldName1" ]
  }
  \`\`\`

- **Use as**. Sometimes <dfn>Robots</dfn> take several inputs. For instance,
  [🤖/video/merge](https://transloadit.com/docs/transcoding/video-encoding/video-merge/) can create a slideshow
  from audio and images. You can map different <dfn>Steps</dfn> to the appropriate inputs.

  Example:

  \`\`\`json
  "use": {
    "steps": [
      { "name": "audio_encoded", "as": "audio" },
      { "name": "images_resized", "as": "image" }
    ]
  }
  \`\`\`

  Sometimes the ordering is important, for instance, with our concat <dfn>Robots</dfn>.
  In these cases, you can add an index that starts at 1. You can also
  optionally filter by the multipart field name. Like in this example, where all files are coming
  from the same source (end-user uploads), but with different \`<input>\` names:

  Example:

  \`\`\`json
  "use": {
    "steps": [
      { "name": ":original", "fields": "myFirstVideo", "as": "video_1" },
      { "name": ":original", "fields": "mySecondVideo", "as": "video_2" },
      { "name": ":original", "fields": "myThirdVideo", "as": "video_3" }
    ]
  }
  \`\`\`

  For times when it is not apparent where we should put the file, you can use <dfn>Assembly Variables</dfn>
  to be specific. For instance, you may want to pass a text file to
  [🤖/image/resize](https://transloadit.com/docs/transcoding/image-manipulation/image-resize/) to burn the text in an image, but
  you are burning multiple texts, so where do we put the text file? We specify it via \`\${use.text_1}\`,
  to indicate the first text file that was passed.

  Example:

  \`\`\`json
  "watermarked": {
    "robot": "/image/resize",
    "use"  : {
      "steps": [
        { "name": "resized", "as": "base" },
        { "name": "transcribed", "as": "text" },
      ],
    },
    "text": [
      {
        "text"  : "Hi there",
        "valign": "top",
        "align" : "left",
      },
      {
        "text"    : "From the 'transcribed' Step: \${use.text_1}",
        "valign"  : "bottom",
        "align"   : "right",
        "x_offset": 16,
        "y_offset": -10,
      }
    ]
  }
  \`\`\`

</details>`),
  })
  .describe("undefined")

export type GoogleStoreRobot = z.infer<typeof google_store_robot_schema>
