import * as mapper from './commentsMapper';

describe('commentsMapper', () => {
  describe('toCommentData', () => {
    it('maps newCommentDTO to CommentData', () => {
      const newCommentDTO = {
        movieId: 'movie id',
        username: 'user123',
        comment: 'some comment',
      };
      const commentData = mapper.toCommentData(newCommentDTO);
      expect(commentData).toEqual({
        movie_id: 'movie id',
        username: 'user123',
        comment: 'some comment',
      });
    });
  });

  describe('toCommentDTO', () => {
    it('should map Movie to MovieDTO', () => {
      const comment = {
        id: 'comment id',
        movie_id: 'movie id',
        username: 'user123',
        comment: 'some comment',
      };
      const commentDTO = mapper.toCommentDTO(comment);
      expect(commentDTO).toEqual({
        id: 'comment id',
        movieId: 'movie id',
        username: 'user123',
        comment: 'some comment',
      });
    });
  });

  describe('toCommentsDTO', () => {
    it('should map Movie array to MovieDTO array', () => {
      const comment = {
        id: 'comment id',
        movie_id: 'movie id',
        username: 'user123',
        comment: 'some comment',
      };
      const commentDTO = mapper.toCommentsDTO([comment]);
      expect(commentDTO).toEqual([{
        id: 'comment id',
        movieId: 'movie id',
        username: 'user123',
        comment: 'some comment',
      }]);
    });
  });
});
