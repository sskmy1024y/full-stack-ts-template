import { initTRPC, TRPCError } from '@trpc/server'
import type { AppContext } from '../context/appContext.js'
import { AppError } from '../error/appError.js'
import { UsecaseError } from '../usecase/types.js'
import superjson from 'superjson'

const t = initTRPC.context<AppContext>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure

export const middleware = t.middleware

const errorHandler = middleware(async ({ next }) => {
  try {
    return await next()
  } catch (error) {
    if (error instanceof UsecaseError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.errorBody.code,
      })
    }
    if (error instanceof AppError) {
      throw new TRPCError({
        code: getHTTPStatusCodeFromError(error),
        message: error.message,
      })
    }
    throw error
  }
})

function getHTTPStatusCodeFromError(error: AppError): any {
  switch (error.statusCode) {
    case 400:
      return 'BAD_REQUEST'
    case 401:
      return 'UNAUTHORIZED'
    case 403:
      return 'FORBIDDEN'
    case 404:
      return 'NOT_FOUND'
    case 500:
    default:
      return 'INTERNAL_SERVER_ERROR'
  }
}

export const procedure = publicProcedure.use(errorHandler)
