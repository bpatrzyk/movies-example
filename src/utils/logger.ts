import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json } = format;

export const loggerConfig = {
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'error',
  format: combine(timestamp(), json()),
  transports: [new transports.Console()],
};

export const logger = createLogger(loggerConfig);
