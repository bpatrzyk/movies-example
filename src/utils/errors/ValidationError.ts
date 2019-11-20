import { ApiError } from './ApiError';
import { ValidationError as ExpressValidationError } from 'express-validator';

export class ValidationError extends ApiError {
  constructor(message: string, public readonly errors: ExpressValidationError[]) {
    super(400, message);
  }
}
