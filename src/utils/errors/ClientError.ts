import { ApiError } from './ApiError';

export class ClientError extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}
