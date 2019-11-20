import { Request, Response } from 'express';
import * as service from '../services/moviesService';
import * as mapper from '../mappers/moviesMapper';
import { NewMovieDTO } from '../dtos/movieDTO';

export async function getMovies(req: Request, res: Response) {
  const movies = await service.getMovies();
  res.send(mapper.toMoviesDTO(movies));
}

export async function postMovie(req: Request, res: Response) {
  const newMovieDTO = req.body as NewMovieDTO;
  const movie = await service.createMovie(newMovieDTO.title);
  res.send(mapper.toMovieDTO(movie));
}
