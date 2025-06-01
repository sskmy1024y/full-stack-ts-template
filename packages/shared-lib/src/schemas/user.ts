import { z } from "zod";

export const userCreateSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long"),
});

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .optional(),
  email: z.string().email("Invalid email format").optional(),
});

export const loginCredentialsSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const userIdSchema = z.object({
  id: z.string().uuid("Invalid user ID format"),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type LoginCredentialsInput = z.infer<typeof loginCredentialsSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
