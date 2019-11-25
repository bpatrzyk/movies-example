import { ApiError } from './ApiError';
import { ValidationError as ExpressValidationError } from 'express-validator';

export class ValidationError extends ApiError {
  constructor(message: string, public readonly errors: ExpressValidationError[]) {
    super(400, message);
  }
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      ValidationError:
 *        type: object
 *        required:
 *          - message
 *        properties:
 *          message:
 *            type: string
 *          errors:
 *            type: 'array'
 *            items:
 *              $ref: '#/components/schemas/ExpressValidationError'
 *        example:
 *           message: Validation error
 *           errors: [{
 *             location: body,
 *             param: movieId,
 *             value: incorrect,
 *             msg: Invalid value
 *           }]
 *      ExpressValidationError:
 *        type: object
 *        required:
 *          - param
 *          - msg
 *          - value
 *        properties:
 *          location:
 *            type: string
 *          param:
 *            type: string
 *          value:
 *            type: string
 *          msg:
 *            type: string
 *        example:
 *          location: body
 *          param: movieId
 *          value: incorrect
 *          msg: Invalid value
 */
