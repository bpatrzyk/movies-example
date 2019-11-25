export interface NewMovieDTO {
  title: string;
}

export interface MovieDTO {
  id: string;
  title: string;
  year: number;
  genre: string;
  country: string;
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      NewMovieDTO:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *        example:
 *           title: Red
 *
 *      MovieDTO:
 *        type: object
 *        required:
 *          - id
 *          - title
 *          - year
 *          - genre
 *          - country
 *        properties:
 *          id:
 *            type: uuid
 *          title:
 *            type: string
 *          year:
 *            type: number
 *          genre:
 *            type: string
 *          country:
 *            type: string
 *        example:
 *           id: a2a1e7bf-7922-4459-862d-1cc60308019a
 *           title: RED
 *           year: 2010
 *           genre: Action, Comedy, Crime, Thriller
 *           country: USA
 */
