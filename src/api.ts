const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IContent {
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  id: number;
}

export interface IDetailContent extends IContent {
  genres: { id: number; name: string }[];
  created_by?: {
    id: number;
    credit_id: string;
    name: string;
    profile_path: string | null;
  }[];
  vote_average?: number;
}

export interface IGetContentsResult {
  dates: {
    maximum: string;
    minimun: string;
  };
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}

export function getMovie(id: number) {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTv(id: number) {
  return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}

export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getOnTheAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}

export function getSearchTvs(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((res) => res.json());
}

export function getSearchMovies(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((res) => res.json());
}
