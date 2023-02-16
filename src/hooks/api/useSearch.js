import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useSearchMovie() {
  const {userData} =useContext(AuthContext)
  const language = userData.language
  const {
    data: resultsMovies,
    loading: resultsMoviesLoading,
    error: resultsMoviesError,
    act: searchMovies,
  } = useAsync((page, query) => moviesApi.searchMovies(page, query, language));

  return {
    resultsMoviesLoading,
    resultsMoviesError,
    resultsMovies,
    searchMovies,
  };
}
