import { z } from "zod";

export const credentialsSchema = z.string({
  description:
    "Please create your associated Template Credentials in your Transloadit account and use the name of your Template Credentials as this parameter's value. They will contain the correct values for your Robot.",
});

export type Credentials = z.infer<typeof credentialsSchema>;
