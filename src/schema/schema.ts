import { z } from "zod";

// Common validation for names
const requiredSchema = z.string().min(1, "This is required");

// Common email validation
const emailSchema = z.string().email("Invalid email address");

// Common password validation
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

// User creation schema
export const insertUserSchema = z.object({
  firstName: requiredSchema,
  lastName: requiredSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Type for user creation
export type InsertUser = z.infer<typeof insertUserSchema>;

// User update schema
export const updateUserSchema = z.object({
  firstName: requiredSchema,
  lastName: requiredSchema,
  email: emailSchema,
  avatar: z.string().optional(),
});

// Type for user update
export type UpdateUser = z.infer<typeof updateUserSchema>;

// Auth Sign in schema
export const signinSchema = z.object({
  email: emailSchema,
  password: requiredSchema,
});

export const createProjectSchema = z.object({
  name: requiredSchema,
  fullBathrooms: z
    .string()
    .min(1, "Full Bathrooms are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Full bathrooms must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "Full bathrooms must be a non-negative integer",
    }),
  halfBathrooms: z
    .string()
    .min(1, "Half Bathrooms are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Half bathrooms must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "Half bathrooms must be a non-negative integer",
    }),
  livingRooms: z
    .string()
    .min(1, "Living rooms are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Living rooms must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "Living rooms must be a non-negative integer",
    }),
  squareFeet: z
    .string()
    .min(1, "Square feet is required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Square feet must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Square feet must be a positive integer",
    }),
});

export type CreateProject = z.infer<typeof createProjectSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: requiredSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;

export const assumptionSheetSchema = z.object({
  vendorWindows: z
    .string()
    .min(1, "Windows are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Windows must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "Windows must be a non-negative integer",
    }),
  vendorLVP: z
    .string()
    .min(1, "LVP is required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "LVP must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "LVP must be a non-negative integer",
    }),
  vendorStairTreads: z
    .string()
    .min(1, "Stair Treads are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Stair Treads must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "Stair Treads must be a non-negative integer",
    }),
  vendorDoors: z
    .string()
    .min(1, "Interior Doors are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Interior Doors must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Interior Doors must be a positive integer",
    }),
  vendorCabinets: z
    .string()
    .min(1, "Cabinets are required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Cabinets must be a valid number",
    })
    .refine((val) => val >= 0, {
      message: "Cabinets must be a non-negative integer",
    }),
  materialTile: z
    .string()
    .min(1, "Tile is required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "Tile must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "Tile must be a positive integer",
    }),
  materialLVP: z
    .string()
    .min(1, "LVP is required")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "LVP must be a valid number",
    })
    .refine((val) => val > 0, {
      message: "LVP must be a positive integer",
    }),
});

export type AssumptionSheet = z.infer<typeof assumptionSheetSchema>;
