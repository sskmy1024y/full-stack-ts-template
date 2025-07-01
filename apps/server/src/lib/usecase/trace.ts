import type { AppContext } from '../context/appContext.js'
import { Log } from '../logger/Log.js'

export const withUsecaseTraceLog = async <T>(
  _ctx: AppContext,
  usecaseName: string,
  metadata: Record<string, unknown>,
  fn: () => Promise<T>
): Promise<T> => {
  const startTime = Date.now()
  const logger = Log.child(usecaseName)

  try {
    logger.info('Starting with:', metadata)
    const result = await fn()
    const duration = Date.now() - startTime
    logger.info(`Completed in ${duration}ms`)
    return result
  } catch (error) {
    const duration = Date.now() - startTime
    logger.error(`Failed after ${duration}ms:`, { error })
    throw error
  }
}
