import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function usePopularMovies() {
    const {
      data: popularMovies,
      loading: popularMoviesLoading,
      error: popularMoviesError,
      act: getPopularMovies,
    } = useAsync((page) => moviesApi.getPopularMovies(page));
  
    return {
        popularMoviesLoading,
        popularMoviesError,
      popularMovies,
      getPopularMovies,
    };
  }