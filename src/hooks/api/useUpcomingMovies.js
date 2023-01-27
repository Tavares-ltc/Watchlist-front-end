import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useUpcomingMovies() {
  const {
    data: UpcomingMovies,
    loading: UpcomingMoviesLoading,
    error: UpcomingMoviesError,
    act: getUpcomingMovies,
  } = useAsync((page) => moviesApi.getUpcomingMovies(page));

  return {
    UpcomingMoviesLoading,
    UpcomingMoviesError,
    UpcomingMovies,
    getUpcomingMovies,
  };
}
