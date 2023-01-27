import api from "./api";

async function getMovies(page = 1) {
  const response = await api.get(`/movies?page=${page}`);
  return response.data;
}

async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
}

async function getPopularMovies(page = 1) {
  const response = await api.get(`/movies/popular?page=${page}`);
  return response.data;
}

async function getNowPlayingMovies(page = 1) {
  const response = await api.get(`/movies/nowplaying?page=${page}`);
  return response.data;
}

async function getUpcomingMovies(page = 1) {
  const response = await api.get(`/movies/upcoming?page=${page}`);
  return response.data;
}

async function getTopRatedMovies(page = 1) {
  const response = await api.get(`/movies/toprated?page=${page}`);
  return response.data;
}
export default {getMovies, getMovieDetails, getPopularMovies, getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies}