import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getComments, postComment } from '../controllers/commentsController';
import { postCommentValidator } from '../validators/commentsValidator';

export const commentsRouter: Router = Router();

commentsRouter.get('/', asyncErrorHandler(getComments));
commentsRouter.post('/', postCommentValidator, asyncErrorHandler(postComment));

/**
 * @swagger
 * path:
 *  /comments/:
 *    get:
 *      summary: Get all comments
 *      tags: [Comments]
 *      responses:
 *        "200":
 *          description: An array of comments
 *          content:
 *            application/json:
 *              schema:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/CommentDTO'
 *    post:
 *      summary: Create a comment
 *      tags: [Comments]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewCommentDTO'
 *      responses:
 *        "200":
 *          description: A created post
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CommentDTO'
 *        "400":
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ValidationError'
 *        "404":
 *          description: Movie does not exist
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ApiError'
 */
