import { Request, Response } from 'express';
import * as service from '../services/moviesService';
import { NewMovie } from '../models/movieModel';

export async function getMovies(req: Request, res: Response) {
  const movies = await service.getMovies();
  res.send(movies);
}

export async function postMovie(req: Request, res: Response) {
  const movie = await service.createMovie(req.body as NewMovie);
  res.send(movie);
}
