import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useSearchMovie() {
  const {
    data: resultsMovies,
    loading: resultsMoviesLoading,
    error: resultsMoviesError,
    act: searchMovies,
  } = useAsync((page, query) => moviesApi.searchMovies(page, query));

  return {
    resultsMoviesLoading,
    resultsMoviesError,
    resultsMovies,
    searchMovies,
  };
}