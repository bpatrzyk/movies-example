import * as model from '../models/movieModel';
import * as OMDBService from './omdbService';
import { toMovie } from '../mappers/moviesMapper';
import { logger } from '../utils/logger';

export async function getMovies() {
  return await model.getMovies();
}

export async function createMovie(title: string) {
  const omdbMovie = await OMDBService.getMovie(title);
  const movie = toMovie(omdbMovie);
  return await model.createMovie(movie);
}
