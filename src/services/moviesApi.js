import api from "./api";

async function getMovies(category = "popular", page = 1, language = "en-US") {
  const response = await api.get(`/movies/${category}?language=${language}&page=${page}`);
  return response.data;
}

async function getMovieDetails(movieId, language="en-US") {
  const response = await api.get(`/movie/${movieId}?language=${language}`);
  return response.data;
}


async function searchMovies(page = 1,query = "", language = "en-US" ) {
  const response = await api.get(`/movies/search?page=${page}&language=${language}&query=${query}`);
  return response.data;
}
export default {getMovies, getMovieDetails, searchMovies}