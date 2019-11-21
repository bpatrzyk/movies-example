import { db } from './db';

import { getMovies, createMovie, exists } from './movieModel';

describe('movieModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovies', () => {
    it('selects all movies from db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([{
          id: 'some id',
          title: 'some title',
          year: 1994,
          genre: 'Comedy',
          country: 'US',
        }]);
      });
      const movies = await getMovies();
      expect(db).toBeCalledWith('movies');
      expect(db('movies').select).toBeCalledWith();
      expect(movies).toEqual([{
        id: 'some id',
        title: 'some title',
        year: 1994,
        genre: 'Comedy',
        country: 'US',
      }]);
    });
  });

  describe('createMovie', () => {
    it('creates movie in db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([{
          id: 'some id',
          title: 'some title',
          year: 1994,
          genre: 'Comedy',
          country: 'US',
        }]);
      });
      const movie = {
        title: 'some title',
        year: 1994,
        genre: 'Comedy',
        country: 'US',
      };
      const createdMovie = await createMovie(movie);
      expect(db).toBeCalledWith('movies');
      expect(db('movies').insert).toBeCalledWith(movie);
      expect(db('movies').returning).toBeCalledWith('*');
      expect(createdMovie).toEqual({
        id: 'some id',
        title: 'some title',
        year: 1994,
        genre: 'Comedy',
        country: 'US',
      })
    });
  });

  describe('exists', () => {
    it('returns true if movie exists in the db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([{}]);
      });
      const result = await exists('some movie');
      expect(db).toBeCalledWith('movies');
      expect(db('movies').select).toBeCalledWith(1);
      expect(db('movies').where).toBeCalledWith({ title: 'some movie' });
      expect(result).toEqual(true);
    });

    it('returns false if movie does not exist in the db', async () => {
      (db().then as jest.Mock).mockImplementationOnce(done => {
        done([]);
      });
      const result = await exists('some movie');
      expect(db).toBeCalledWith('movies');
      expect(db('movies').select).toBeCalledWith(1);
      expect(db('movies').where).toBeCalledWith({ title: 'some movie' });
      expect(result).toEqual(false);
    });
  });
});
