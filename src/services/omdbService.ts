// See terms of use: http://www.omdbapi.com/legal.htm

import fetch from 'node-fetch';
import url from 'url';

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
  const response = await fetch(queryUrl);
  return await response.json() as OMDBMovie;
}
