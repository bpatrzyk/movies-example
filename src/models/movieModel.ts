import { db } from './db';

export interface Movie {
  id: string;
  name: string;
}

export interface NewMovie {
  name: string;
}

export async function getMovies() {
  return db<Movie>('movies')
    .select();
}

export async function createMovie(movie: NewMovie) {
  const [createdMovie] = await db<Movie>('movies')
    .insert(movie)
    .returning('*');
  return createdMovie;
}
