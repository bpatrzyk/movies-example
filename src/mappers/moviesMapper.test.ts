import * as mapper from './moviesMapper';
import { OMDBMovie } from '../services/omdbService';
import { Movie, MovieData } from '../models/movieModel';
import { MovieDTO } from '../dtos/movieDTOs';

const omdbMovie = {
  Title: 'some title',
  Year: '1994',
  Genre: 'Comedy',
  Country: 'US',
} as OMDBMovie;

const movieData = {
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as MovieData;

const movie = {
  id: 'uuid',
  ...movieData,
} as Movie;

const movieDTO = {
  id: 'uuid',
  title: 'some title',
  year: 1994,
  genre: 'Comedy',
  country: 'US',
} as MovieDTO;

describe('moviesMapper', () => {
  describe('toMovie', () => {
    it('maps OMDB Movie to model Movie', () => {
      const result = mapper.toMovie(omdbMovie);
      expect(result).toEqual(movieData);
    });

    it('should not map incorrect year', () => {
      const result = mapper.toMovie({
        ...omdbMovie,
        Year: 'incorrect',
      });
      expect(result.year).toBeNull();
    });
  });

  describe('toMovieDTO', () => {
    it('should map Movie to MovieDTO', () => {
      const result = mapper.toMovieDTO(movie);
      expect(result).toEqual(movieDTO);
    });
  });

  describe('toMoviesDTO', () => {
    it('should map Movie array to MovieDTO array', () => {
      const result = mapper.toMoviesDTO([movie]);
      expect(result).toEqual([movieDTO]);
    });
  });
});
