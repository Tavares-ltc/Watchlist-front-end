import useAsync from "../useAsync";
import moviesApi from "../../services/moviesApi";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function useMovies() {
  const {userData} =useContext(AuthContext)
  const language = userData.language
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    act: getMovies,
  } = useAsync((category, page) =>
    moviesApi.getMovies(category, page, language)
  );

  return {
    moviesLoading,
    moviesError,
    movies,
    getMovies,
  };
}
