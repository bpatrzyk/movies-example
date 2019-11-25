import { Router } from 'express';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getMovie, getMovies, postMovie } from '../controllers/moviesController';
import { getCommentsForMovie } from '../controllers/commentsController';
import { getMovieValidator, postMovieValidator } from '../validators/moviesValidator';

export const moviesRouter: Router = Router();

moviesRouter.get('/:movie_id', getMovieValidator, asyncErrorHandler(getMovie));
moviesRouter.get('/:movie_id/comments', getMovieValidator, asyncErrorHandler(getCommentsForMovie));
moviesRouter.get('/', asyncErrorHandler(getMovies));
moviesRouter.post('/', postMovieValidator, asyncErrorHandler(postMovie));

/**
 * @swagger
 * path:
 *  /movies/:
 *    get:
 *      summary: Get all movies
 *      tags: [Movies]
 *      responses:
 *        "200":
 *          description: An array of movies
 *          content:
 *            application/json:
 *              schema:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/MovieDTO'
 *    post:
 *      summary: Create a movie
 *      tags: [Movies]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/NewMovieDTO'
 *      responses:
 *        "200":
 *          description: A created movie
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MovieDTO'
 *        "400":
 *          description: Movie already exists, movie does not exist or validation error
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/ApiError'
 *                  - $ref: '#/components/schemas/ValidationError'
 *  /movies/{movie_id}:
 *    get:
 *      summary: Get a single movie
 *      tags: [Movies]
 *      parameters:
 *        - name: movie_id
 *          in: path
 *          required: true
 *          description: 'Movie ID'
 *          type: 'uuid'
 *      responses:
 *        "200":
 *          description: A single movie
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MovieDTO'
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
 *  /movies/{movie_id}/comments:
 *    get:
 *      summary: Get comments for a movie
 *      tags: [Movies]
 *      parameters:
 *        - name: movie_id
 *          in: path
 *          required: true
 *          description: 'Movie ID'
 *          type: 'uuid'
 *      responses:
 *        "200":
 *          description: Comments for a movie
 *          content:
 *            application/json:
 *              schema:
 *                type: 'array'
 *                items:
 *                  $ref: '#/components/schemas/CommentDTO'
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
