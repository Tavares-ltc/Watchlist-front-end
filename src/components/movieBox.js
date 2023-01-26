import React from "react";
import { generatePath, Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";


export function MovieBox({ poster_src, genres, movieId }) {
    const navigate = useNavigate()
    const location = useLocation()
    return (
    <>
      <MovieBoxWrappler>
        <img src={poster_src} onClick={() => {
            const path = `${location.pathname}?movieId=${movieId}`
            navigate(path)
            window.location.reload()
        } }/>
        <GenreWrappler>
          <h1>{genres[0]}</h1>
          <h1>{genres[1]}</h1>
        </GenreWrappler>
      </MovieBoxWrappler>
    </>
  );
}

const MovieBoxWrappler = styled.div`
  width: 240px;
  img {
    width: 90%;
    height: 297px;
    cursor: pointer;
  }
  &:hover {
    transform: scale(1.1);
  }
`;
const GenreWrappler = styled.div`
  height: 40px;
  display: flex;
  gap: 10px;
  h1 {
    color: #f16305;
  }
`;
