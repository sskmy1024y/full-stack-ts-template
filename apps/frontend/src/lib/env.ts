/* eslint-disable no-undef */
import { z } from 'zod'

const envSchema = z
  .object({
    NEXT_PUBLIC_API_URL: z.string().nullish(),
    NEXT_PUBLIC_VERCEL_URL: z.string().nullish(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  })
  .transform((val, ctx) => {
    const apiUrl = val.NEXT_PUBLIC_API_URL ?? undefined
    if (!apiUrl) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'NEXT_PUBLIC_API_URL is required' })
      return z.NEVER
    }

    return { NODE_ENV: val.NODE_ENV, API_URL: apiUrl }
  })

export type EnvironmentVariables = z.infer<typeof envSchema>
export type EnvironmentVariablesInput = z.input<typeof envSchema>

// Next.jsのビルド時の環境変数インライン化に対応するため、一度オブジェクトに詰めてからparseする
const tmpEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  NODE_ENV: process.env.NODE_ENV,
} satisfies Record<keyof EnvironmentVariablesInput, unknown>

const parsed = envSchema.safeParse(tmpEnv)

if (!parsed.success) {
  throw new Error(`Environment variables are invalid: ${parsed.error.message}`)
}

export const env: EnvironmentVariables = parsed.data

export const isDev = env.NODE_ENV === 'development'
export const isProd = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'
