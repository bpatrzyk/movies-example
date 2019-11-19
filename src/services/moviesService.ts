import * as model from '../models/movieModel';

export async function getMovies() {
  return await model.getMovies();
}

export async function createMovie(movie: model.NewMovie) {
  return await model.createMovie(movie);
}
