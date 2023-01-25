import useAsync from "../useAsync";
import * as moviesApi from "../../services/moviesApi";

export default function useMovies() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    act: getMovies,
  } = useAsync(() => moviesApi.getMovies());

  return {
    moviesLoading,
    moviesError,
    movies,
    getMovies,
  };
}
