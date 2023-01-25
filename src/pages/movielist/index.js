import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import useMovies from "../../hooks/api/useMovies";
import { MoviesSection } from "./moviesSection";

export default function Movielist() {
  const {movies, moviesLoading, moviesError} = useMovies()
if(moviesLoading) return <h1>Loading...</h1>
if(moviesError) console.log(moviesError)
console.log(movies)

  return (
    <>
      <BackgroundWrappler>
        <Header />
        <MoviesSection movies={movies}/>
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
