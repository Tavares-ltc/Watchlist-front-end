import api from "./api";

async function getMovies(category = "popular", language="en-US", page = 1) {
  const response = await api.get(`/movies/${category}?${language}&page=${page}`);
  return response.data;
}

async function getMovieDetails(movieId) {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
}


async function searchMovies(page = 1,query = "", language = "en-US" ) {
  const response = await api.get(`/movies/search?page=${page}&language=${language}&query=${query}`);
  return response.data;
}
export default {getMovies, getMovieDetails, searchMovies}