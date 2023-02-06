import useAsync from "../useAsync";
import useToken from "../useToken";
import watchlistApi from "../../services/watchlistApi";

export default function useRateMovie() {
  const token = useToken();

  const {
    loading: ratingLoading,
    error: ratingError,
    act: postRateMovie,
  } = useAsync((watchlistId, stars) =>
    watchlistApi.rateMovie(token, watchlistId, stars)
  );

  return {
    ratingLoading,
    ratingError,
    postRateMovie,
  };
}
