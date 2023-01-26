import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import useMovies from "../../hooks/api/useMovies";
import { MoviesSection } from "./moviesSection";
import { useInView } from "react-intersection-observer";

export default function Movielist() {
  const { ref, inView } = useInView({threshold: 0});
  const [currentPage, setCurrentPage] = useState(1);
  const { getMovies } = useMovies();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fechData();
  }, [inView === true]);
console.log(inView)
  async function fechData() {
    const promise = await getMovies(currentPage);
    const newMovies = promise.results
      setMovies( [...movies, ...newMovies])
    setCurrentPage(currentPage + 1);
  }
  if (movies.length === 0) return <h1>Loading...</h1>;
  console.log(movies)
  return (
    <>
      <BackgroundWrappler>
        <Header />
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
