import * as model from '../models/movieModel';
import * as OMDBService from './omdbService';
import { mapOMDBMovie } from '../mappers/moviesMapper';

export async function getMovies() {
  return await model.getMovies();
}

export async function createMovie(title: string) {
  const omdbMovie = await OMDBService.getMovie(title);
  console.log(omdbMovie);
  const movie = mapOMDBMovie(omdbMovie);
  console.log(movie)
  return await model.createMovie(movie);
}
