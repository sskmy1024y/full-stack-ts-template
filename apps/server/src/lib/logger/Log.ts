export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LoggerOptions {
  timestamp?: boolean
  colorize?: boolean
}

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface Logger {
  debug: (message: string, metadata?: Record<string, unknown>) => void
  info: (message: string, metadata?: Record<string, unknown>) => void
  warn: (message: string, metadata?: Record<string, unknown>) => void
  error: (message: string, metadata?: Record<string, unknown>) => void
  child: (context: string) => Logger
}

const formatMessage = (
  level: LogLevel,
  message: string,
  metadata?: Record<string, unknown>,
  options: LoggerOptions = {}
): string => {
  const parts: string[] = []

  if (options.timestamp ?? true) {
    parts.push(`[${new Date().toISOString()}]`)
  }

  parts.push(`[${level.toUpperCase()}]`)
  parts.push(message)

  if (metadata && Object.keys(metadata).length > 0) {
    parts.push(JSON.stringify(metadata))
  }

  return parts.join(' ')
}

const log = (
  level: LogLevel,
  message: string,
  metadata?: Record<string, unknown>,
  options?: LoggerOptions
): void => {
  const formattedMessage = formatMessage(level, message, metadata, options)

  switch (level) {
    case 'debug':
      console.log(formattedMessage)
      break
    case 'info':
      console.log(formattedMessage)
      break
    case 'warn':
      console.warn(formattedMessage)
      break
    case 'error':
      console.error(formattedMessage)
      break
  }
}

export const createLogger = (options: LoggerOptions = {}): Logger => {
  const debug = (message: string, metadata?: Record<string, unknown>) =>
    log('debug', message, metadata, options)

  const info = (message: string, metadata?: Record<string, unknown>) =>
    log('info', message, metadata, options)

  const warn = (message: string, metadata?: Record<string, unknown>) =>
    log('warn', message, metadata, options)

  const error = (message: string, metadata?: Record<string, unknown>) =>
    log('error', message, metadata, options)

  const child = (context: string): Logger => {
    const addContext = (message: string) => `[${context}] ${message}`

    return {
      debug: (message: string, metadata?: Record<string, unknown>) =>
        debug(addContext(message), metadata),
      info: (message: string, metadata?: Record<string, unknown>) =>
        info(addContext(message), metadata),
      warn: (message: string, metadata?: Record<string, unknown>) =>
        warn(addContext(message), metadata),
      error: (message: string, metadata?: Record<string, unknown>) =>
        error(addContext(message), metadata),
      child: (subContext: string) => child(`${context}:${subContext}`),
    }
  }

  return {
    debug,
    info,
    warn,
    error,
    child,
  }
}

// Export default logger instance
export const Log = createLogger()
