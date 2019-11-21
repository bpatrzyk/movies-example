import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/errors/ApiError';
import { ValidationError } from '../utils/errors/ValidationError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  // if we encounter an error while streaming the response to the client
  // the Express default error handler closes the connection and fails the request.
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ValidationError) {
    return handleValidationError(err, res);
  }
  if (err instanceof ApiError) {
    return handleApiError(err, res);
  }
  if (err instanceof SyntaxError) {
    return handleSyntaxError(err, res);
  }
  handleError(err, res);
}

function handleApiError(err: ApiError, res: Response) {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    message,
  });
}

function handleValidationError(err: ValidationError, res: Response) {
  const { statusCode, message, errors } = err;
  res.status(statusCode).json({
    message,
    errors,
  });
}

// Handles JSON parse errors
function handleSyntaxError(err: SyntaxError, res: Response) {
  res.status(400).json({
    message: err.message,
  });
}

function handleError(err: Error, res: Response) {
  res.status(500).json({
    message: 'Internal server error',
  });
}
