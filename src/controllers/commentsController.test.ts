import { Request, Response } from 'express';
import httpMocks from 'node-mocks-http';
import * as service from '../services/commentsService';
import * as moviesService from '../services//moviesService';
import * as mapper from '../mappers/commentsMapper';
import { getComments, getCommentsForMovie, postComment } from './commentsController';
import { Comment, CommentData } from '../models/commentModel';
import { CommentDTO, NewCommentDTO } from '../dtos/commentDTOs';
import { Movie } from '../models/movieModel';

jest.mock('../services/commentsService', () => ({
  getComments: jest.fn(),
  getCommentsForMovie: jest.fn(),
  createComment: jest.fn(),
}));

jest.mock('../mappers/commentsMapper', () => ({
  toCommentsDTO: jest.fn(),
  toCommentData: jest.fn(),
  toCommentDTO: jest.fn(),
}));

jest.mock('../services/moviesService', () => ({
  getMovie: jest.fn(),
  getMovies: jest.fn(),
  createMovie: jest.fn(),
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

const movieId = 'some id';

const movie = {
  id: 'some id',
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as Movie;

describe('commentsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  describe('getCommentsForMovie', () => {
    beforeEach(() => {
      (service.getCommentsForMovie as jest.Mock).mockImplementationOnce(async () => [comment]);
      (mapper.toCommentsDTO as jest.Mock).mockImplementationOnce(() => [commentDTO]);
      (moviesService.getMovie as jest.Mock).mockResolvedValueOnce(movie);
    });

    it('checks if movie exists', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getCommentsForMovie(req, res);

      expect(moviesService.getMovie).toHaveBeenCalledWith(movieId);
    });

    it('throws NotFoundError if the movie is not found', async () => {
      (moviesService.getMovie as jest.Mock).mockReset();
      (moviesService.getMovie as jest.Mock).mockResolvedValueOnce(undefined);

      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );
      expect.assertions(1);

      try {
        await getCommentsForMovie(req, res);
      } catch (e) {
        expect(e.message).toEqual('Movie "some id" does not exist');
      }
    });

    it('gets comments from the service for a specific movie', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getCommentsForMovie(req, res);

      expect(service.getCommentsForMovie).toHaveBeenCalledWith(movieId);
    });

    it('maps comments to DTOs', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getCommentsForMovie(req, res);

      expect(mapper.toCommentsDTO).toHaveBeenCalledWith([comment]);
    });

    it('responds with comments', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>(
        { params: { movie_id: movieId } },
        {},
      );

      await getCommentsForMovie(req, res);

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
      (moviesService.getMovie as jest.Mock).mockResolvedValueOnce(movie);
    });

    it('maps request DTO to model object', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});

      await postComment(req, res);

      expect(mapper.toCommentData).toHaveBeenCalledWith(newCommentDTO);
    });

    it('checks if movie exists', async () => {
      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});

      await postComment(req, res);

      expect(moviesService.getMovie).toHaveBeenCalledWith('movie id');
    });

    it('throws NotFoundError if the movie is not found', async () => {
      (moviesService.getMovie as jest.Mock).mockReset();
      (moviesService.getMovie as jest.Mock).mockResolvedValueOnce(undefined);

      const { req, res } = httpMocks.createMocks<Request, Response>({ body: newCommentDTO }, {});
      expect.assertions(1);

      try {
        await postComment(req, res);
      } catch (e) {
        expect(e.message).toEqual('Movie "movie id" does not exist');
      }
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
