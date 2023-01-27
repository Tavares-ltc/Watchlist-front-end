import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useNowPlayingMovies() {
  const {
    data: playingMovies,
    loading: playingMoviesLoading,
    error: playingMoviesError,
    act: getNowPlayingMovies,
  } = useAsync((page) => moviesApi.getNowPlayingMovies(page));

  return {
    playingMovies,
    playingMoviesLoading,
    playingMoviesError,
    getNowPlayingMovies,
  };
}
