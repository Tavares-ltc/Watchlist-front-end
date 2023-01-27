import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import useMovies from "../../hooks/api/useMovies";
import { MoviesSection } from "./MoviesSection";
import { useInView } from "react-intersection-observer";
import { useQuery } from "../../hooks/useQuery";
import { MovieDetails } from "./MovieDetailsModal";
import usePopularMovies from "../../hooks/api/usePopularMovies";
import { SyncLoader } from "react-spinners";
import useNowPlayingMovies from "../../hooks/api/useNowPlayingMovies";
import useUpcomingMovies from "../../hooks/api/useUpcomingMovies";
import useTopRatedMovies from "../../hooks/api/useTopRatedMovies";

export default function Movielist({ moviesCategory }) {
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const { getMovies } = useMovies();
  const { getPopularMovies } = usePopularMovies();
  const { getNowPlayingMovies } = useNowPlayingMovies();
  const { getUpcomingMovies } = useUpcomingMovies();
  const {getTopRatedMovies} = useTopRatedMovies()
  const [movies, setMovies] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  let query = useQuery();
  const [movieId, setMovieId] = useState(query.get("movieId"));

  useEffect(() => {
    fechData(moviesCategory);
  }, [inView === true]);

  async function fechData(moviesCategory) {
    let promise;
    switch (moviesCategory) {
      case "Popular":
        promise = await getPopularMovies(currentPage);
        break;
      case "Discover":
        promise = await getMovies(currentPage);

        break;
      case "Now Playing":
        promise = await getNowPlayingMovies(currentPage);
        break;
      case "Upcoming":
        promise = await getUpcomingMovies(currentPage);
        break;
      case "Top Rated":
        promise = await getTopRatedMovies(currentPage);
        break;
      default:
        promise = await getUpcomingMovies(currentPage);
    }
    if (promise.results.length === 0) return setHasMorePages(false);
    const newMovies = promise.results;
    setMovies([...movies, ...newMovies]);
    setCurrentPage(currentPage + 1);
  }
  if (movies.length === 0) {
    return (
      <>
        <BackgroundWrappler>
          <Header />
          <LoadingContainer>
            <SyncLoader color='#de0f62' />
          </LoadingContainer>
        </BackgroundWrappler>
      </>
    );
  }
  return (
    <>
      <BackgroundWrappler>
        <Header />
        <MovieDetails movieId={movieId} />
        <MoviesSection
          movies={movies}
          setMovieId={setMovieId}
          inView={ref}
          hasMorePages={hasMorePages}
        />
      </BackgroundWrappler>
    </>
  );
}

const BackgroundWrappler = styled.div`
  height: 100%;
  max-width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #000f17;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
