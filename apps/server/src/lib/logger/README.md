# Logger Module

This module provides a centralized logging system using a functional approach that can be easily extended with third-party logging libraries.

## Usage

```typescript
import { Log } from './lib/logger/Log.js'

// Basic logging
Log.info('Server started')
Log.error('Connection failed', { error: err })

// With context
const userLogger = Log.child('UserService')
userLogger.info('User created', { userId: 123 })

// Create custom logger instance
import { createLogger } from './lib/logger/Log.js'

const customLogger = createLogger({ timestamp: false })
customLogger.debug('Debug message without timestamp')
```

## Future Integration

To integrate with logging libraries like Winston or Pino:

```typescript
// Example: Winston integration
import winston from 'winston'
import { LogLevel, LoggerOptions, Logger } from './Log.js'

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

export const createWinstonLogger = (options: LoggerOptions = {}): Logger => {
  const log = (level: LogLevel, message: string, metadata?: Record<string, unknown>) => {
    winstonLogger.log(level, message, metadata)
  }

  return {
    debug: (message, metadata) => log('debug', message, metadata),
    info: (message, metadata) => log('info', message, metadata),
    warn: (message, metadata) => log('warn', message, metadata),
    error: (message, metadata) => log('error', message, metadata),
    child: (context) => {
      // Implementation for child logger with Winston
    }
  }
}
```