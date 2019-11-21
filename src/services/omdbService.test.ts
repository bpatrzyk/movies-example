import fetch from 'node-fetch';
import { getMovie, OMDBMovie } from './omdbService';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../utils/logger', () => ({
  logger: {
    debug: jest.fn(),
  },
}));

const title = 'some title';

const movie = {
  Title: 'some title',
  Year: '1994',
  Genre: 'Comedy',
  Country: 'US',
  Response: 'True',
} as OMDBMovie;

describe('omdbService', () => {
  describe('getMovie', () => {
    it('should create query url', async () => {
      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        json: () => movie,
      });

      await getMovie(title);

      expect(fetch).toHaveBeenCalledWith(expect.objectContaining({
        href: 'http://www.omdbapi.com/?apikey=undefined&t=some%20title',
      }));
    });

    it('should return movie data', async () => {
      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        json: () => movie,
      });

      const result = await getMovie(title);

      expect(result).toEqual(movie);
    });

    it('should throw exception on fetch errors', async () => {
      (fetch as unknown as jest.Mock).mockRejectedValueOnce({
        error: 'error',
      });

      expect.assertions(1);
      try {
        await getMovie(title);
      } catch (e) {
        expect(e).toEqual({ error: 'error' });
      }
    });

    it('should throw exception on API errors', async () => {
      (fetch as unknown as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          ...movie,
          Response: 'False',
        }),
      });

      expect.assertions(1);
      try {
        await getMovie(title);
      } catch (e) {
        expect(e).toEqual(new Error(`Movie "${title}" not found`));
      }
    });
  });
});
