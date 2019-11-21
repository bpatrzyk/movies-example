import * as mapper from './commentsMapper';
import { CommentDTO, NewCommentDTO } from '../dtos/commentDTOs';
import { Comment, CommentData } from '../models/commentModel';

const newCommentDTO = {
  movieId: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as NewCommentDTO;

const commentData = {
  movie_id: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as CommentData;

const comment = {
  id: 'comment id',
  movie_id: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as Comment;

const commentDTO = {
  id: 'comment id',
  movieId: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as CommentDTO;

describe('commentsMapper', () => {
  describe('toCommentData', () => {
    it('maps newCommentDTO to CommentData', () => {
      const result = mapper.toCommentData(newCommentDTO);
      expect(result).toEqual(commentData);
    });
  });

  describe('toCommentDTO', () => {
    it('should map Movie to MovieDTO', () => {
      const result = mapper.toCommentDTO(comment);
      expect(result).toEqual(commentDTO);
    });
  });

  describe('toCommentsDTO', () => {
    it('should map Movie array to MovieDTO array', () => {
      const result = mapper.toCommentsDTO([comment]);
      expect(result).toEqual([commentDTO]);
    });
  });
});
