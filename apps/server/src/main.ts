import { env } from './lib/env/env.js'
import { createServer } from './lib/server/fastify.js'
import { Log } from './lib/logger/Log.js'

async function main() {
  try {
    const server = await createServer()

    await server.listen({
      port: env.PORT,
      host: '0.0.0.0',
    })

    Log.info(`🚀 Server ready at http://localhost:${env.PORT}`)
    Log.info(`📡 tRPC endpoint: http://localhost:${env.PORT}/trpc`)

    // Handle graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      Log.info(`\n👋 Received ${signal}, gracefully shutting down...`)
      try {
        await server.close()
        Log.info('✅ Server closed successfully')
        process.exit(0)
      } catch (error) {
        Log.error('❌ Error during shutdown:', { error })
        process.exit(1)
      }
    }

    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  } catch (error) {
    Log.error('❌ Error starting server:', { error })
    process.exit(1)
  }
}

main().catch((error) => {
  Log.error('❌ Unhandled error:', { error })
  process.exit(1)
})
