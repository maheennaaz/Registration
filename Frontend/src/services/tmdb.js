import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) {
    throw new Error(
      'Missing TMDB API key. Set VITE_TMDB_API_KEY in Frontend/.env then restart the dev server.'
    );
  }
  return key;
}

function getLanguage() {
  return import.meta.env.VITE_TMDB_LANGUAGE || 'en-US';
}

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

async function get(path, params = {}) {
  const response = await tmdb.get(path, {
    params: {
      api_key: getApiKey(),
      language: getLanguage(),
      ...params,
    },
  });
  return response.data;
}

export function posterUrl(path, size = 'w342') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function backdropUrl(path, size = 'w1280') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function fetchTrending() {
  return get('/trending/all/week');
}

export async function fetchPopularMovies() {
  return get('/movie/popular');
}

export async function fetchTopRatedMovies() {
  return get('/movie/top_rated');
}

export async function fetchNowPlayingMovies() {
  return get('/movie/now_playing');
}

