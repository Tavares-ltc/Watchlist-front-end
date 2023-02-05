import React from "react";
import { generatePath, Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export function MovieBox({ children, genres, movieId }) {
  return (
    <>
      <MovieBoxWrappler>
        {children}
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
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
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
