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

// Define the form schema
export const formSchema2 = z.object({
  registrationFee: z.string().min(1, { message: "Registration fee is required" }).max(100, { message: "Fee must be 100 characters or less" }),
  competitionStartDate: z.date().nullable(),
  competitionStartTime: z.date().nullable(),
  registrationStartDate: z.date().nullable(),
  registrationStartTime: z.date().nullable(),
  registrationEndDate: z.date().nullable(),
  registrationEndTime: z.date().nullable(),
  eligibility: z.string().min(1, "Eligibility is required"),
  prizes: z.array(
    z.object({
      prizeName: z.string().min(1, "Prize name is required"),
      prizeAmount: z.number().min(1, "Prize amount must be greater than 0"),
    })
  ).min(1, "At least one prize is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  festival: z.string().optional(),
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

export const registrationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
  organization: z.string().min(2, "Organization name is required"),
  type: z.enum(["college", "university", "school", "fresher"], {
    required_error: "Please select your type",
  }),
  teamName: z.string().min(2, "Team name is required"),
  trxid: z.string().min(2, "Transaction ID is required"),
});

export const registrationSchemaIndividual = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
  organization: z.string().min(2, "Organization name is required"),
  type: z.enum(["college", "university", "school", "fresher"], {
    required_error: "Please select your type",
  }),
  
});

export const teamMemberSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().optional(),
  gender: z.enum(["male", "female"], {
    required_error: "Please select your gender",
  }),
});



export const formSchemaMentor = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(190, "First name cannot exceed 190 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(190, "Last name cannot exceed 190 characters"),
  gender: z.enum(["male", "female"], "Please select a valid gender"),
  mobileNo: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid mobile number")
    .optional(),
  organisation: z.string().min(1, "Organisation/Institute is required"),
  domain: z
    .string()
    .min(1, "Domain is required")
    .optional(),
  workExperience: z
    .string()
    .max(190, "Work experience cannot exceed 190 characters")
    .optional(),
  bio: z.string().optional(),
  languages: z
    .array(z.string().nonempty("Language cannot be empty"))
    .optional(),
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional(),
  facebookUrl: z
    .string()
    .url("Please enter a valid Facebook URL")
    .optional(),
  youtubeUrl: z
    .string()
    .url("Please enter a valid YouTube URL")
    .optional(),
  protfolioUrl: z
    .string()
    .url("Please enter a valid portfolio URL")
    .optional(),
});

export const formSchemaMentor2 = z.object({
  schoolName: z
    .string()
    .min(1, { message: "School name is required." })
    .max(100, { message: "School name cannot exceed 100 characters." }),

  collegeName: z
    .string()
    .min(1, { message: "College name is required." })
    .max(100, { message: "College name cannot exceed 100 characters." }),

  universityName: z
    .string()
    .min(1, { message: "University name is required." })
    .max(100, { message: "University name cannot exceed 100 characters." }),

  skills: z
    .array(z.string().min(1, { message: "Skill cannot be empty." }))
    .min(1, { message: "At least one skill is required." }),

  topics: z
    .array(z.string().min(1, { message: "Topic cannot be empty." }))
    .min(1, { message: "At least one topic is required." }),
});

 

