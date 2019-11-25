import * as model from '../models/movieModel';
import * as OMDBService from './omdbService';
import { toMovie } from '../mappers/moviesMapper';
import { ClientError } from '../utils/errors/ClientError';

export async function getMovie(movieId: string) {
  return await model.getMovie(movieId);
}

export async function getMovies() {
  return await model.getMovies();
}

export async function createMovie(title: string) {
  const omdbMovie = await OMDBService.getMovie(title);
  const movie = toMovie(omdbMovie);

  const exists = await model.exists(movie.title);
  if (exists) {
    throw new ClientError(`Movie "${movie.title}" already exists`);
  }

  return await model.createMovie(movie);
}
