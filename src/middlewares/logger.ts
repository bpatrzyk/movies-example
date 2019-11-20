import * as expressWinston from 'express-winston';
import { loggerConfig } from '../utils/logger';

export const logMiddleware = expressWinston.logger(loggerConfig);
export const errorLogMiddleware = expressWinston.errorLogger(loggerConfig);
