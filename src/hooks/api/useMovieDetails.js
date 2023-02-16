import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import moviesApi from "../../services/moviesApi";
import useAsync from "../useAsync";

export default function useMovieDetails() {
  const {userData} =useContext(AuthContext)
  const language = userData.language
  const {
    data: details,
    loading: detailsLoading,
    error: detailsError,
    act: getMovieDetails,
  } = useAsync((movieId) => moviesApi.getMovieDetails(movieId, language));

  return {
    detailsLoading,
    detailsError,
    details,
    getMovieDetails,
  };
}
