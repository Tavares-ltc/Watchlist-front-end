import useAsync from "../useAsync";
import useToken from "../useToken";
import watchlistApi from "../../services/watchlistApi";

export default function useRemoveWatchlistMovie() {
  const token = useToken();

  const {
    loading: deleteWatchlistLoading,
    error: deleteWatchlistError,
    act: removeWatchlistMovie,
  } = useAsync((movieId) => watchlistApi.removeFromWatchlist(token, movieId));

  return {
    deleteWatchlistLoading,
    deleteWatchlistError,
    removeWatchlistMovie,
  };
}
