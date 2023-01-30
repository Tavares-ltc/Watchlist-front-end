import useAsync from "../useAsync";
import moviesApi from "../../services/moviesApi";

export default function useMovies() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    act: getMovies,
  } = useAsync((category,language, page) => moviesApi.getMovies(category, language, page));

  return {
    moviesLoading,
    moviesError,
    movies,
    getMovies,
  };
}
