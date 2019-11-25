export interface NewCommentDTO {
  movieId: string;
  username: string;
  comment: string;
}

export interface CommentDTO {
  id: string;
  movieId: string;
  username: string;
  comment: string;
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      NewCommentDTO:
 *        type: object
 *        required:
 *          - movieId
 *          - username
 *          - comment
 *        properties:
 *          movieId:
 *            type: uuid
 *          username:
 *            type: string
 *          comment:
 *            type: string
 *        example:
 *           movieId: 061474e2-9d9b-4bb9-8ca3-d82fdc707655
 *           username: user123
 *           comment: The best movie ever!
 *
 *      CommentDTO:
 *        type: object
 *        required:
 *          - id
 *          - movieId
 *          - username
 *          - comment
 *        properties:
 *          id:
 *            type: uuid
 *          movieId:
 *            type: uuid
 *          username:
 *            type: string
 *          comment:
 *            type: string
 *        example:
 *           id: 60dafc0b-f21e-4257-a485-321e17dbd3e8
 *           movieId: 061474e2-9d9b-4bb9-8ca3-d82fdc707655
 *           username: user123
 *           comment: The best movie ever!
 */
