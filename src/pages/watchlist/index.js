import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { MoviesSection } from "../movielist/MoviesSection";

import { MovieDetails } from "../movielist/MovieDetailsModal";
import { Background } from "../../components/Background";
import { AccountMenuModal } from "../movielist/AccountMenuModal";
import { PageLoading } from "../../components/PageLoading";
import { useQuery } from "../../hooks/useQuery";
import useWatchlistMovies from "../../hooks/api/useWatchlistMovies";
import { useNavigate, useParams } from "react-router-dom";
import { UserSection } from "./UserSection";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function WatchlistPage() {
  const { getWatchlistMovies } = useWatchlistMovies();
  const [movies, setMovies] = useState([]);
  const [watchlistUser, setWatchlistUser] = useState({});
  const { userData } = useContext(AuthContext);

  let query = useQuery();
  const [movieId, setMovieId] = useState(query.get("movieId"));
  const { userId } = useParams();
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.name) {
      toast.error("You need an account to access this page.", {
        theme: "dark",
      });
      return navigate("/popular");
    }
    fetchMovies();
  }, []);

  if (movies.length === 0) {
    return <PageLoading />;
  }
  return (
    <>
      <Background>
        <Header setIsAccountModalVisible={setIsAccountModalVisible} />
        <AccountMenuModal
          isAccountModalVisible={isAccountModalVisible}
          setIsAccountModalVisible={setIsAccountModalVisible}
        />
        <MovieDetails movieId={movieId} setMovieId={setMovieId} />
        <UserSection userData={watchlistUser} />
        <MoviesSection movies={movies} setMovieId={setMovieId} />
      </Background>
    </>
  );

  async function fetchMovies() {
    try {
      const response = await getWatchlistMovies(userId);
      response.movies.map((movie) => {
        movie.watchlistId = movie.id;
        movie.id = movie.TMDB_movie_id;
      });
      if (!userId) {
        const url = window.location.toString();
        const urlWithUserId = `${url}/${response.userData.id}`;
        window.history.replaceState("", "", urlWithUserId);
      }
      if (response.movies.length === 0) {
        if (
          !alert(
            "Looks like you dont have movies on watchlist yet, double click any movie image to add it to your watchlist"
          )
        ) {
          navigate("/discover");
        }
      }
      setWatchlistUser(response.userData);
      setMovies(response.movies);
    } catch (error) {
      console.log(error.message);
    }
  }
}
