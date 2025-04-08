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

// Common number input validation
const numberSchema = z
  .number()
  .nonnegative("This must be a non-negative number")
  .refine((val) => !isNaN(val), {
    message: "This must be a valid number",
  });

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
  fullBathrooms: numberSchema,
  halfBathrooms: numberSchema,
  livingRooms: numberSchema,
  squareFeet: numberSchema,
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

export const assumptionSchema = z.object({
  localWindows: numberSchema,
  localLVP: numberSchema,
  localStairThreads: numberSchema,
  localInteriorDoors: numberSchema,
  localCabinets: numberSchema,
  overageTile: numberSchema,
  overageLVP: numberSchema,
});
export type AssumptionType = z.infer<typeof assumptionSchema>;
