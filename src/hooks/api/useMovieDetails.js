import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useMovieDetails() {
    const {
      data: details,
      loading: detailsLoading,
      error: detailsError,
      act: getMovieDetails,
    } = useAsync((movieId) => moviesApi.getMovieDetails(movieId));
  
    return {
      detailsLoading,
      detailsError,
      details,
      getMovieDetails,
    };
  }