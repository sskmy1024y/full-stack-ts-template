import { z } from 'zod'

export const emailSchema = z
  .string()
  .email()
  .max(64 + 255) // 64 characters for local part + 255 characters for domain part

export type Email = z.infer<typeof emailSchema>
