import * as winston from 'winston';
import 'winston-daily-rotate-file';
import appRoot from 'app-root-path';

const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%.log',
      dirname: `${appRoot}/logs/`,
      level: 'info',
      handleExceptions: true,
      colorize: true,
      json: false,
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug'
    })
  );
}

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

export default logger;