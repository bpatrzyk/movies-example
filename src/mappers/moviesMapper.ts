import { OMDBMovie } from '../services/omdbService';
import { Movie, MovieData } from '../models/movieModel';
import { MovieDTO } from '../dtos/movieDTOs';

export function toMovie(omdbMovie: OMDBMovie) {
  const year = parseInt(omdbMovie.Year, 10);
  return {
    title: omdbMovie.Title,
    year: isNaN(year) ? null : year,
    genre: omdbMovie.Genre,
    country: omdbMovie.Country,
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
