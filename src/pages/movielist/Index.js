import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import useMovies from "../../hooks/api/useMovies";
import { MoviesSection } from "./MoviesSection";
import { useInView } from "react-intersection-observer";
import { useQuery } from "../../hooks/useQuery";
import { MovieDetails } from "./MovieDetailsModal";
import { SyncLoader } from "react-spinners";
import useSearchMovie from "../../hooks/api/useSearch";
import { Background } from "../../components/Background";
import { Modal } from "../../components/Modal";
import { AccountMenuModal } from "./AccountMenuModal";

export default function MovielistPage({ moviesCategory }) {
  const [moviesCategoryType, setMoviesCategoryType] = useState(moviesCategory);

  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  const { getMovies } = useMovies();
  const { searchMovies } = useSearchMovie();
  const [movies, setMovies] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(true);

  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false)

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
        <Background>
          <Header />
          <LoadingContainer>
            <SyncLoader color='#de0f62' />
          </LoadingContainer>
        </Background>
      </>
    );
  }
  return (
    <>
      <Background>
        <Header setIsAccountModalVisible={setIsAccountModalVisible} />
        <AccountMenuModal isAccountModalVisible={isAccountModalVisible} setIsAccountModalVisible={setIsAccountModalVisible}/>
        <MovieDetails movieId={movieId} setMovieId={setMovieId} />
        <MoviesSection
          movies={movies}
          setMovieId={setMovieId}
          inView={ref}
          hasMorePages={hasMorePages}
        />
      </Background>
    </>
  );

  async function fechResultsFromSearch(searchQuery) {
    if (searchQuery?.length > 0) {
      //movies needs to be set back to 0
      setMovies([]);
      //category needs to be changed to "Search" to continue geting new movies on each page
      if (moviesCategoryType !== "search") setMoviesCategoryType("search");

      // The page needs to be set back to 1
      setCurrentPage(1);
      const promise = await searchMovies(currentPage, searchQuery);
      if (promise.results.length < 1)
        if (
          !alert(
            "An error occurred while searching for your movie. You will need to reload the page. 😥"
          )
        ) {
          window.location.reload();
        }
      setMovies(promise.results);
    }
  }
  async function fechData(moviesCategory) {
    let promise;

    if (moviesCategory === "search") {
      promise = await searchMovies(currentPage, searchQuery);
    } else {
      promise = await getMovies(moviesCategory, "en-Us", currentPage);
    }

    if (promise.results.length === 0) return setHasMorePages(false);

    const newMovies = promise.results;
    setMovies([...movies, ...newMovies]);
    setCurrentPage(currentPage + 1);
  }
}

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
