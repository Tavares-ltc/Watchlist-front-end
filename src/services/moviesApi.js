import api from "./api";

async function getMovies(page = 1) {
  const response = await api.get(`/movies?page=${page}`);
  return response.data;
}

async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
}

async function getPopularMovies(page) {
  const response = await api.get(`/movies/popular?page=${page}`);
  return response.data;
}


export default {getMovies, getMovieDetails, getPopularMovies}