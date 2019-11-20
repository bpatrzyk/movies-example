import { db } from './db';

export interface MovieData {
  title: string;
  year: number;
  genre: string;
  country: string;
}

export interface Movie extends MovieData{
  id: string;
}

export async function getMovies() {
  return db<Movie>('movies')
    .select();
}

export async function createMovie(movie: MovieData) {
  const [createdMovie] = await db<Movie>('movies')
    .insert(movie)
    .returning('*');
  return createdMovie;
}
