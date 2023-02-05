import useAsync from "../useAsync";
import useToken from "../useToken";
import watchlistApi from "../../services/watchlistApi";

export default function useAddWatchlist() {
    const token = useToken();
    
  const {
    loading: insertionLoading,
    error: inserionError,
    act: postWatchlistMovie,
  } = useAsync((movieId) => watchlistApi.postWatchlistMovie(movieId, token));

  return {
    insertionLoading,
    inserionError,
    postWatchlistMovie,
  };
}