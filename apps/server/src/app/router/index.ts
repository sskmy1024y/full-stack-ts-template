import { router } from '../../lib/server/trpc.js'
import { userRouter } from './userRouter.js'

export const appRouter = router({
  user: userRouter,
})

export type AppRouter = typeof appRouter
