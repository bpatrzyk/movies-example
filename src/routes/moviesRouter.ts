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
 */
