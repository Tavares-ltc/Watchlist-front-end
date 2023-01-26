import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import useMovies from "../../hooks/api/useMovies";
import { MoviesSection } from "./moviesSection";
import { useInView } from "react-intersection-observer";
import { Modal } from "../../components/modal";
import { useLocation } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { MovieDetails } from "./movieDetailsModal";
import usePopularMovies from "../../hooks/api/usePopularMovies";
export default function Movielist() {
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const { getMovies } = useMovies();
  const { getPopularMovies } = usePopularMovies()
  const [movies, setMovies] = useState([]);
  let query = useQuery();
  const [movieId, setMovieId] = useState(query.get("movieId"))

  useEffect(() => {
    fechData();
  }, [inView === true]);

  
  async function fechData() {
    const promise = await getPopularMovies(currentPage);
    const newMovies = promise.results;
    setMovies([...movies, ...newMovies]);
    setCurrentPage(currentPage + 1);
  }


  if (movies.length === 0) return <h1>Loading...</h1>;
  return (
    <>
      <BackgroundWrappler>
        <Header />
        <MovieDetails movieId={movieId}/>
        <MoviesSection movies={movies} inView={ref} />
      </BackgroundWrappler>
    </>
  );
}

const BackgroundWrappler = styled.div`
  height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #000f17;
  overflow: hidden;
`;
