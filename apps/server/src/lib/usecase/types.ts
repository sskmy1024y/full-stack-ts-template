import type { z } from 'zod'

export type Usecase<TContext, TInputSchema extends z.ZodSchema, TOutput> = {
  inputSchema: TInputSchema
  run: (ctx: TContext, input: z.infer<TInputSchema>) => Promise<TOutput>
}

export class UsecaseError extends Error {
  constructor(
    public errorBody: {
      code: string
      condition: 'pre_condition' | 'post_condition' | 'unknown_condition'
    }
  ) {
    super(`${errorBody.code}: ${errorBody.condition}`)
    this.name = 'UsecaseError'
  }
}
