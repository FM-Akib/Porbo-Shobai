import { z } from "zod"

// Define the schema within the same file
export const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required"}).max(190, { message: "Title must be 190 characters or less"}),
    organization: z.string().min(1, "Organization is required").max(190, "Organization must be 190 characters or less"),
    websiteUrl: z.string().url("Invalid URL"),
    opportunityType: z.string().min(1, "Opportunity type is required"),
    mode: z.string().min(1, "Mode is required"),
    visibility: z.string().min(1, "Visibility is required"),
    subtitle: z.string().min(1, "Subtitle is required").max(190, "Subtitle must be 190 characters or less"),
    city: z.string().min(1, "City is required"),
    location: z.string().min(1, "Location is required"),
  })
