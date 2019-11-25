import { Request, Response } from 'express';
import * as service from '../services/commentsService';
import * as moviesService from '../services//moviesService';
import * as mapper from '../mappers/commentsMapper';
import { NewCommentDTO } from '../dtos/commentDTOs';
import { NotFoundError } from '../utils/errors/NotFoundError';

export async function getComments(req: Request, res: Response) {
  const comments = await service.getComments();
  res.send(mapper.toCommentsDTO(comments));
}

export async function getCommentsForMovie(req: Request, res: Response) {
  const movieId = req.params.movie_id;
  const movie = await moviesService.getMovie(movieId);
  if (!movie) {
    throw new NotFoundError(`Movie "${movieId}" does not exist`);
  }

  const comments = await service.getCommentsForMovie(movie.id);
  res.send(mapper.toCommentsDTO(comments));
}

export async function postComment(req: Request, res: Response) {
  const newCommentDTO = req.body as NewCommentDTO;
  const movie = await moviesService.getMovie(newCommentDTO.movieId);
  if (!movie) {
    throw new NotFoundError(`Movie "${newCommentDTO.movieId}" does not exist`);
  }

  const comment = await service.createComment(mapper.toCommentData(newCommentDTO));
  res.send(mapper.toCommentDTO(comment));
}
