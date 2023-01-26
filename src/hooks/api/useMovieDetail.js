import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useMovieDetails(movieId) {
    const {
      data: details,
      loading: detailsLoading,
      error: detailsError,
      act: getMovieDetails,
    } = useAsync(() => moviesApi.getMovieDetails(movieId));
  
    return {
      detailsLoading,
      detailsError,
      details,
      getMovieDetails,
    };
  }