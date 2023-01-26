import api from "./api";

export async function getMovies(page = 1) {
  const response = await api.get(`/movies?page=${page}`);
  return response.data;
}
