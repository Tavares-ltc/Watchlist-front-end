import useAsync from "../useAsync";
import useToken from "../useToken";
import watchlistApi from "../../services/watchlistApi";

export default function useDeleteRating() {
  const token = useToken();

  const {
    loading: deleteRatingLoading,
    error: deleteRatingError,
    act: deleteRating,
  } = useAsync((ratingId) => watchlistApi.deleteRating(token, ratingId));

  return {
    deleteRatingLoading,
    deleteRatingError,
    deleteRating,
  };
}
