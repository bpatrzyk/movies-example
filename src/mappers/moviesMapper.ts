import { OMDBMovie } from '../services/omdbService';
import { Movie, MovieData } from '../models/movieModel';
import { MovieDTO } from '../dtos/movieDTO';

export function toMovie(obdbMovie: OMDBMovie) {
  const year = parseInt(obdbMovie.Year, 10);
  return {
    title: obdbMovie.Title,
    year: isNaN(year) ? null : year,
    genre: obdbMovie.Genre,
    country: obdbMovie.Country,
  } as MovieData;
}

export function toMovieDTO(movie: Movie) {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    genre: movie.genre,
    country: movie.country,
  } as MovieDTO;
}

export function toMoviesDTO(movies: Movie[]) {
  return movies.map(movie => toMovieDTO(movie));
}
