import React from "react";
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
  position: relative;
  
  img {
    height: 297px;
    width: 90%;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    cursor: pointer;
  }
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 1200px) {
    width: 170px;
    img {
      height: 220px;
    }
    h1 {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 410px) {
    width: 130px;
    img {
      height: 180px;
    }
    h1 {
      font-size: 12px;
    }
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
