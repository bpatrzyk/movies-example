import * as mapper from './moviesMapper';

describe('moviesMapper', () => {
  describe('toMovie', () => {
    it('maps OMDB Movie to model Movie', () => {
      const omdbMovie = {
        Title: 'some title',
        Year: '1994',
        Genre: 'Comedy',
        Country: 'US',
      };
      const movie = mapper.toMovie(omdbMovie);
      expect(movie).toEqual({
        title: 'some title',
        year: 1994,
        genre: 'Comedy',
        country: 'US',
      });
    });

    it('should not map incorrect year', () => {
      const omdbMovie = {
        Title: 'some title',
        Year: 'incorrect',
        Genre: 'Comedy',
        Country: 'US',
      };
      const movie = mapper.toMovie(omdbMovie);
      expect(movie).toEqual({
        title: 'some title',
        year: null,
        genre: 'Comedy',
        country: 'US',
      });
    })
  });

  describe('toMovieDTO', () => {
    it('should map Movie to MovieDTO', () => {
      const movie = {
        id: 'uuid',
        title: 'some title',
        year: 1993,
        genre: 'Comedy',
        country: 'US',
      };
      const movieDTO = mapper.toMovieDTO(movie);
      expect(movieDTO).toEqual({
        id: 'uuid',
        title: 'some title',
        year: 1993,
        genre: 'Comedy',
        country: 'US',
      });
    });
  });

  describe('toMoviesDTO', () => {
    it('should map Movie array to MovieDTO array', () => {
      const movie = {
        id: 'uuid',
        title: 'some title',
        year: 1993,
        genre: 'Comedy',
        country: 'US',
      };
      const movieDTO = mapper.toMoviesDTO([movie]);
      expect(movieDTO).toEqual([{
        id: 'uuid',
        title: 'some title',
        year: 1993,
        genre: 'Comedy',
        country: 'US',
      }]);
    });
  });
});
