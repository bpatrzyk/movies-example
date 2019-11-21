import { db } from './db';

import { getComments, createComment } from './commentModel';

describe('commentModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getComments', () => {
    it('selects all comments from db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([{
          id: 'some id',
          movie_id: 'movie id',
          username: 'user123',
          comment: 'some comment',
        }]);
      });
      const comments = await getComments();
      expect(db).toBeCalledWith('comments');
      expect(db('comments').select).toBeCalledWith();
      expect(comments).toEqual([{
        id: 'some id',
        movie_id: 'movie id',
        username: 'user123',
        comment: 'some comment',
      }]);
    });
  });

  describe('createComment', () => {
    it('creates comment in db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([{
          id: 'some id',
          movie_id: 'movie id',
          username: 'user123',
          comment: 'some comment',
        }]);
      });
      const comment = {
        movie_id: 'movie id',
        username: 'user123',
        comment: 'some comment',
      };
      const createdMovie = await createComment(comment);
      expect(db).toBeCalledWith('comments');
      expect(db('comments').insert).toBeCalledWith(comment);
      expect(db('comments').returning).toBeCalledWith('*');
      expect(createdMovie).toEqual({
        id: 'some id',
        movie_id: 'movie id',
        username: 'user123',
        comment: 'some comment',
      })
    });
  });
});
