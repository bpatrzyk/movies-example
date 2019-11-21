import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import * as service from '../services/commentsService';
import * as mapper from '../mappers/commentsMapper';
import { getComments, postComment } from './commentsController';
import { CommentData, Comment } from '../models/commentModel';
import { CommentDTO, NewCommentDTO } from '../dtos/commentDTOs';

jest.mock('../services/commentsService', () => ({
  getComments: jest.fn(),
  createComment: jest.fn(),
}));

jest.mock('../mappers/commentsMapper', () => ({
  toCommentsDTO: jest.fn(),
  toCommentData: jest.fn(),
  toCommentDTO: jest.fn(),
}));

const commentData = {
  movie_id: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as CommentData;

const comment = {
  id: 'some id',
  ...commentData,
} as Comment;

const commentDTO = {
  id: 'some id',
  movieId: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as CommentDTO;

const newCommentDTO = {
  movieId: 'movie id',
  username: 'user123',
  comment: 'some comment',
} as NewCommentDTO;

describe('commentsController', () => {
  describe('getComments', () => {
    beforeEach(() => {
      (service.getComments as jest.Mock).mockImplementationOnce(async () => [comment]);
      (mapper.toCommentsDTO as jest.Mock).mockImplementationOnce(() => [commentDTO]);
    });

    it('gets comments from the service', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await getComments(req, res);

      expect(service.getComments).toHaveBeenCalledWith();
    });

    it('maps comments to DTOs', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await getComments(req, res);

      expect(mapper.toCommentsDTO).toHaveBeenCalledWith([comment]);
    });

    it('responds with comments', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({}, {});

      await getComments(req, res);

      expect(res.statusCode).toEqual(200);
      expect(res._getData()).toEqual([commentDTO]);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

  describe('postComment', () => {
    beforeEach(() => {
      (mapper.toCommentData as jest.Mock).mockImplementationOnce(() => commentData);
      (service.createComment as jest.Mock).mockImplementationOnce(async () => comment);
      (mapper.toCommentDTO as jest.Mock).mockImplementationOnce(() => commentDTO);
    });

    it('maps request DTO to model object', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});

      await postComment(req, res);

      expect(mapper.toCommentData).toHaveBeenCalledWith(newCommentDTO);
    });

    it('calls create comment service', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});

      await postComment(req, res);

      expect(service.createComment).toHaveBeenCalledWith(commentData);
    });

    it('maps created comment to DTO', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});

      await postComment(req, res);

      expect(mapper.toCommentDTO).toHaveBeenCalledWith(comment);
    });

    it('responds with the created comment', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});

      await postComment(req, res);

      expect(res.statusCode).toEqual(200);
      expect(res._getData()).toEqual(commentDTO);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });
});
