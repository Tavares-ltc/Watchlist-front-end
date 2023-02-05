import api from "./api";

async function postWatchlistMovie(movieId, token) {
  const response = await api.post(`/watchlist`,{movie_id: movieId},{
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
}
async function getWatchlistMovies(token, userId = "") {
  const response = await api.get(`/watchlist?user_id=${userId}`,{
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default { postWatchlistMovie, getWatchlistMovies };
