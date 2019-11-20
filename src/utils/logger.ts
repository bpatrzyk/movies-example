import * as winston from 'winston';

export const loggerConfig = {
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console()],
};

export const logger = winston.createLogger(loggerConfig);
