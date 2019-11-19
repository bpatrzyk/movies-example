import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errors/ApiError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // if we encounter an error while streaming the response to the client
  // the Express default error handler closes the connection and fails the request.
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ApiError) {
    return handleApiError(err, res);
  }
  handleError(err, res);
}

function handleApiError(err: ApiError, res: Response) {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    message,
  });
}

function handleError(err: Error, res: Response) {
  const { message } = err;
  res.status(500).json({
    message,
  });
}
