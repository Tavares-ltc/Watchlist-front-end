import React from "react";
import styled from "styled-components";
import { Modal } from "../../components/modal";
import { MovieBox } from "../../components/movieBox";
export function MoviesSection({ movies, inView }) {
  return (
    <>
      <MoviesSectionWrappler>
        <MoviesWrappler>
          {movies?.map((data, index) => (
            <>
              <MovieBox
                key={index}
                poster_src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                }
                genres={data.genres}
                movieId={data.id}
              />
              {movies.length - 10 == index && <div ref={inView} />}
            </>
          ))}
        </MoviesWrappler>
      </MoviesSectionWrappler>
    </>
  );
}

const MoviesSectionWrappler = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const MoviesWrappler = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, auto));
  gap: 20px;
`;
