import { z } from "zod";

const envSchema = z
  .object({
    EXPO_PUBLIC_API_URL: z.string().nullish(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  })
  .transform((val, ctx) => {
    const apiUrl = val.EXPO_PUBLIC_API_URL ?? undefined;
    if (!apiUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "EXPO_PUBLIC_API_URL is required",
      });
      return z.NEVER;
    }

    return {
      NODE_ENV: val.NODE_ENV,
      API_URL: apiUrl,
    };
  });

export type EnvironmentVariables = z.infer<typeof envSchema>;
export type EnvironmentVariablesInput = z.input<typeof envSchema>;

// React Native/Expoの環境変数処理に対応
const tmpEnv = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
} satisfies Record<keyof EnvironmentVariablesInput, unknown>;

const parsed = envSchema.safeParse(tmpEnv);

if (!parsed.success) {
  throw new Error(`Environment variables are invalid: ${parsed.error.message}`);
}

export const env: EnvironmentVariables = parsed.data;

export const isDev = env.NODE_ENV === "development";
export const isProd = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";