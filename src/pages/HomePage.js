import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLoading } from "../components/PageLoading";
import useWatchlistMovies from "../hooks/api/useWatchlistMovies";
export function HomePage() {
  const { movies } = useWatchlistMovies();
  const navigate = useNavigate();
  useEffect(() => {
    if (movies?.length >= 12) {
      return navigate("/watchlist");
    } else {
      navigate("/discover");
    }
  }, [movies]);
  return <PageLoading />;
}
