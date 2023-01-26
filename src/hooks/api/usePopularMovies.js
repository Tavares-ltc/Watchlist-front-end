import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function usePopularMovies(page) {
    const {
      data: popularMovies,
      loading: popularMoviesLoading,
      error: popularMoviesError,
      act: getPopularMovies,
    } = useAsync(() => moviesApi.getPopularMovies(page));
  
    return {
        popularMoviesLoading,
        popularMoviesError,
      popularMovies,
      getPopularMovies,
    };
  }