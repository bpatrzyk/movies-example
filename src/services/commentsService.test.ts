import * as service from './commentsService';
import * as model from '../models/commentModel';
import { Comment, CommentData } from '../models/commentModel';

jest.mock('../models/commentModel', () => ({
  getComments: jest.fn(),
  getCommentsForMovie: jest.fn(),
  createComment: jest.fn(),
}));

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

const movieId = 'some id';

describe('commentsService', () => {
  describe('getComments', () => {
    it('returns list of comments', async () => {
      (model.getComments as jest.Mock).mockResolvedValueOnce([comment]);

      const result = await service.getComments();

      expect(result).toEqual([comment]);
    });
  });

  describe('getCommentsForMovie', () => {
    it('returns list of comments for a movie', async () => {
      (model.getComments as jest.Mock).mockResolvedValueOnce([comment]);

      const result = await service.getCommentsForMovie(movieId);

      expect(result).toEqual([comment]);
      expect(model.getComments).toBeCalledWith({ movieId });
    });
  });

  describe('createComment', () => {
    it('stores the comment in the db', async () => {
      (model.createComment as jest.Mock).mockResolvedValueOnce(comment);

      const result = await service.createComment(commentData);

      expect(model.createComment).toHaveBeenCalledWith(commentData);
      expect(result).toEqual(comment);
    });
  });
});
