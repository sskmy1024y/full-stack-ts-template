import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

export type FastifyContextOptions = Pick<CreateFastifyContextOptions, 'req' | 'res' | 'info'>

export const createFastifyContext = ({ req, res, info }: FastifyContextOptions) => {
  const logger = req.log
  return { req, res, info, logger }
}

export type FastifyContext = Awaited<ReturnType<typeof createFastifyContext>>
