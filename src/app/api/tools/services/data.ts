import { z } from "zod";

export const formSchema = z.object({
  serviceName: z.string().nonempty({ error: "Service name is required" }),
  baseUrl: z.url({ error: "Invalid URL" }).nonempty({ error: "Base URL is required" }),
});

export const defaultValues = {
  serviceName: "",
  baseUrl: "",
};
