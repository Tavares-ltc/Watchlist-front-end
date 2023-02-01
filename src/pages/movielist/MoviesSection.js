import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { Modal } from "../../components/Modal";
import { MovieBox } from "../../components/MovieBox";

export function MoviesSection({ movies, inView, hasMorePages, setMovieId }) {
  const navigate = useNavigate();
  const location = useLocation();
  let isOneClick = true

  return (
    <>
      <MoviesSectionWrappler>
        <MoviesWrappler>
          {movies?.map((data, index) => (
            <>
              <MovieBox key={index} genres={data.genres}>
                <img
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  onClick={(event) => {
                    handleClick(event, data.id);
                  }}
                  ref={inView}
                />
              </MovieBox>
            </>
          ))}
        </MoviesWrappler>
      </MoviesSectionWrappler>
      {!hasMorePages && <Footer />}
    </>
  );

  function handleClick(e, movieId) {

    if (e.detail === 2) {
      isOneClick = false
     return console.log("filme adicionado a sua watchlist");
    }
    setTimeout(() => {
       if(isOneClick){
        const path = `${location.pathname}?movieId=${movieId}`;
        navigate(path);
        setMovieId(movieId)
      }
      isOneClick = true
    }, [300]);
  }
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
