import useAsync from "../useAsync";
import watchlistApi from "../../services/watchlistApi";
import useToken from "../useToken";

export default function useWatchlistMovies() {
  const token = useToken();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    act: getWatchlistMovies,
  } = useAsync((userId = "") => watchlistApi.getWatchlistMovies(token, userId));

  return {
    moviesLoading,
    moviesError,
    movies,
    getWatchlistMovies,
  };
}
