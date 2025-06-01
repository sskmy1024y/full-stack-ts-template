import { z } from "zod";

export class ValidationError extends Error {
  public readonly errors: z.ZodIssue[];

  constructor(message: string, errors: z.ZodIssue[]) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

export function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  return result.data;
}

export function createValidator<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => validateSchema(schema, data);
}
