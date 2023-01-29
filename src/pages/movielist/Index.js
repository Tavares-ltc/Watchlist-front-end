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
import useSearchMovie from "../../hooks/api/useSearch";

export default function Movielist({ moviesCategory }) {
  const [moviesCategoryType, setMoviesCategoryType] = useState(moviesCategory);

  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  const { getMovies } = useMovies();
  const { getPopularMovies } = usePopularMovies();
  const { getNowPlayingMovies } = useNowPlayingMovies();
  const { getUpcomingMovies } = useUpcomingMovies();
  const { getTopRatedMovies } = useTopRatedMovies();
  const { searchMovies } = useSearchMovie();
  const [movies, setMovies] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  
  let query = useQuery();
  const [movieId, setMovieId] = useState(query.get("movieId"));
  const [searchQuery, setSearchQuery] = useState(query.get("term"));
  
  
  useEffect(() => {
    fechResultsFromSearch();
  }, [searchQuery]);

  useEffect(() => {
    fechData(moviesCategoryType);
  }, [inView === true]);


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
        <Header/>
        <MovieDetails movieId={movieId} setMovieId={setMovieId} />
        <MoviesSection
          movies={movies}
          setMovieId={setMovieId}
          inView={ref}
          hasMorePages={hasMorePages}
        />
      </BackgroundWrappler>
    </>
  );

  async function fechResultsFromSearch(searchQuery) {
    if (searchQuery?.length > 0) {
      //movies needs to be set back to 0
      setMovies([]);
      //category needs to be changed to "Search" to continue geting new movies on each page
      if (moviesCategoryType !== "Search") setMoviesCategoryType("Search");

      // The page needs to be set back to 1
      setCurrentPage(1);
      const promise = await searchMovies(currentPage, searchQuery);
      if (promise.results.length < 1)
        if (!alert("An error occurred while searching for your movie. You will need to reload the page. 😥")) {
          window.location.reload();
        }
      setMovies(promise.results);
    }
  }
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
      case "Search":
        promise = await searchMovies(currentPage, searchQuery);
        break;
      default:
        promise = await getUpcomingMovies(currentPage);
    }
    if (promise.results.length === 0) return setHasMorePages(false);
    const newMovies = promise.results;
    setMovies([...movies, ...newMovies]);
    setCurrentPage(currentPage + 1);
  }
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
