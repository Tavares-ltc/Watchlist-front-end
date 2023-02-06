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

async function rateMovie(token, watchlistId, stars){
  const response = await api.post(`/rating`,{watchlist_id: watchlistId, stars},{
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function deleteRating(token, ratingId){
  const response = await api.delete(`/rating/${ratingId}`,{
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
}

async function removeFromWatchlist(token, tmdbMovieId){
  const response = await api.delete(`/watchlist/${tmdbMovieId}`,{
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
}

export default { postWatchlistMovie, getWatchlistMovies, rateMovie, deleteRating, removeFromWatchlist };
