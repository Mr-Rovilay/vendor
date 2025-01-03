import * as z from 'zod';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

// Password regex: At least 8 characters, one uppercase, one lowercase, one number, one special character
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(strongPasswordRegex, 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(strongPasswordRegex, 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'),
  phoneNumber: z.string()
  .regex(/^\d{11}$/, { message: "Phone number must be 11 Nigerian digits" })
    .optional(),
  avatar: z
    .any()
    .refine((files) => files?.length == 0 || files?.length == 1, "Image is optional.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE || !files?.[0], `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) || !files?.[0],
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .regex(/^\d{11}$/, { message: "Phone number must be 11 Nigerian digits" }),
  // password: z.string()
  //   .min(8, { message: "Password must be at least 8 characters" })
  //   .optional()
  //   .or(z.literal(''))
});

export const shopCreateSchema = z.object({
  name: z.string().min(2, { message: "Shop name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string()
    .regex(/^\d{11}$/, { message: "Phone number must be 11 Nigerian digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  zipCode: z.string().regex(/^\d{5}$/, { message: "Zip code must be 5 digits" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: "Password must include uppercase, lowercase, number, and special character"
    }),
    avatar: z.any().refine((file) => file instanceof File, {
      message: "Please upload a valid file",
    }),
});
// Zod Schema for Password Validation
export const passwordSchema = z.object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must include uppercase, lowercase, number, and special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Error is shown on confirmPassword field
  });

