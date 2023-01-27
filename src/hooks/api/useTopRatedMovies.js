import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useTopRatedMovies() {
  const {
    data: TopRatedMovies,
    loading: TopRatedMoviesLoading,
    error: TopRatedMoviesError,
    act: getTopRatedMovies,
  } = useAsync((page) => moviesApi.getTopRatedMovies(page));

  return {
    TopRatedMoviesLoading,
    TopRatedMoviesError,
    TopRatedMovies,
    getTopRatedMovies,
  };
}