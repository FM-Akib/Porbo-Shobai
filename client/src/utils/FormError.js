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

  export const formSchema2 = z.object({
    registrationFee: z.string().min(1, { message: "Registration fee is required" }).max(100, { message: "Fee must be 100 characters or less" }),
    competitionStartDate: z.string().min(1, "Competition start date is required"),
    competitionStartTime: z.string().min(1, "Competition start time is required"),
    registrationStartDate: z.string().min(1, "Registration start date is required"),
    registrationStartTime: z.string().min(1, "Registration start time is required"),
    registrationEndDate: z.string().min(1, "Registration end date is required"),
    registrationEndTime: z.string().min(1, "Registration end time is required"),
    eligibility: z.string().min(1, "Eligibility is required"),
    prizes: z.array(
      z.object({
        prizeName: z.string().min(1, "Prize name is required"),
        prizeAmount: z.number().min(1, "Prize amount must be greater than 0"),
      })
    ).min(1, "At least one prize is required"),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    festival: z.string().min(1, "Festival is required"),
    participationType: z.string().min(1, "Participation type is required"),
    teamSize: z.object({
      minSize: z.number().min(1, "Minimum team size is required"),
      maxSize: z.number().min(1, "Maximum team size is required"),
    }),
    hideHost: z.boolean(),
    contacts: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address").min(1, "Email is required"),
        mobile: z.string().min(1, "Mobile number is required"),
      })
    ).min(1, "At least one contact is required"),
    certificate: z.boolean(),
    numOfParticipantsAllowed: z.number().min(1, "Number of participants allowed is required"),
  });
