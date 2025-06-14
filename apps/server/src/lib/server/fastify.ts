import Fastify from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import cors from '@fastify/cors'
import { env } from '../env/env.js'
import { appRouter } from '../../app/router/index.js'
import { createFastifyContext } from '../context/fastify.js'

export async function createServer() {
  const fastify = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  })

  // Register CORS
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  })

  // Register tRPC
  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext: createFastifyContext,
    },
  })

  // Health check endpoint
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    }
  })

  return fastify
}
