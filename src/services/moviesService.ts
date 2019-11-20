import * as model from '../models/movieModel';
import * as OMDBService from './omdbService';
import { mapOMDBMovie } from '../mappers/moviesMapper';
import { logger } from '../utils/logger';

export async function getMovies() {
  return await model.getMovies();
}

export async function createMovie(title: string) {
  const omdbMovie = await OMDBService.getMovie(title);
  const movie = mapOMDBMovie(omdbMovie);
  return await model.createMovie(movie);
}
