import { db } from './db';
import { getComments, createComment, Comment, CommentData } from './commentModel';

const comment = {
  id: 'some id',
  movie_id: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as Comment;

const commentData = {
  movie_id: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as CommentData;

const movieId = 'movie id';

describe('commentModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getComments', () => {
    it('selects all comments from db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([comment]);
      });

      const comments = await getComments();

      expect(db).toBeCalledWith('comments');
      expect(db('comments').where).not.toBeCalled();
      expect(db('comments').select).toBeCalledWith();
      expect(comments).toEqual([comment]);
    });

    it('selects all comments from db for a specific movie', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([comment]);
      });

      const comments = await getComments({ movieId });

      expect(db).toBeCalledWith('comments');
      expect(db('comments').where).toBeCalledWith({ movie_id: movieId });
      expect(db('comments').select).toBeCalledWith();
      expect(comments).toEqual([comment]);
    });
  });

  describe('createComment', () => {
    it('creates comment in db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([comment]);
      });

      const createdMovie = await createComment(commentData);

      expect(db).toBeCalledWith('comments');
      expect(db('comments').insert).toBeCalledWith(commentData);
      expect(db('comments').returning).toBeCalledWith('*');
      expect(createdMovie).toEqual(comment);
    });
  });
});
