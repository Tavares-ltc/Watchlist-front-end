import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../../components/footer";
import { Modal } from "../../components/modal";
import { MovieBox } from "../../components/movieBox";

export function MoviesSection({ movies, inView, hasMorePages }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <MoviesSectionWrappler>
        <MoviesWrappler>
          {movies?.map((data, index) => (
            <>
              <MovieBox key={index} genres={data.genres}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  onClick={() => {
                    const path = `${location.pathname}?movieId=${data.id}`;
                    navigate(path);
                    window.location.reload();
                  }}
                  ref={inView}
                />
              </MovieBox>
            </>
          ))}
        </MoviesWrappler>
      </MoviesSectionWrappler>
      {!hasMorePages && <Footer/>}

    </>
  );
}

const MoviesSectionWrappler = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const MoviesWrappler = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, auto));
  gap: 40px;
`;
