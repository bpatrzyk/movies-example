// See terms of use: http://www.omdbapi.com/legal.htm

import fetch from 'node-fetch';
import url from 'url';
import _ from 'lodash';
import { logger } from '../utils/logger';
import { ClientError } from '../utils/errors/ClientError';

const API_URL = 'http://www.omdbapi.com';
const API_KEY = process.env.OMDB_API_KEY;

export interface OMDBMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export async function getMovie(title: string) {
  const queryUrl = url.parse(`${API_URL}/?apikey=${API_KEY}&t=${title}`);
  logger.debug(`Looking for the movie "${title}" in OMDB database`, {
    searchParams: { title, queryUrl: queryUrl.href },
  });

  const response = await fetch(queryUrl);
  const movie = await response.json() as OMDBMovie;

  logger.debug(`Received response from OMDB service for movie "${title}"`, {
    searchParams: {
      title,
      queryUrl: queryUrl.href,
    }, response: movie,
  });

  if (_.get(movie, 'Response') !== 'True') {
    logger.debug(`Movie "${title}" not found in OMDB`, {
      searchParams: { title, queryUrl: queryUrl.href },
    });
    throw new ClientError(`Movie "${title}" not found`);
  }

  return movie;
}
