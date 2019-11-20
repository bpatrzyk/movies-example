import { OMDBMovie } from '../services/omdbService';
import { MovieData } from '../models/movieModel';

export function mapOMDBMovie(obdbMovie: OMDBMovie) {
  const year = parseInt(obdbMovie.Year);
  return {
    title: obdbMovie.Title,
    year: isNaN(year) ? null : year,
    genre: obdbMovie.Genre,
    country: obdbMovie.Country,
  } as MovieData;
}
