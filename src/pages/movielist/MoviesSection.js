import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../../components/Footer";
import { MovieBox } from "../../components/MovieBox";
import useAddWatchlist from "../../hooks/api/useAddWatchlist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { PosterToastIcon } from "../../components/PosterToastIcon";
import { GiRoundStar } from "react-icons/gi";

export function MoviesSection({ movies, inView, hasMorePages, setMovieId }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useContext(AuthContext);
  const { postWatchlistMovie } = useAddWatchlist();
  const urlPathName = window.location.pathname.toString();
  const pageName = urlPathName.split("/")[1];
  let isOneClick = true;
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
                    handleClick(event, data);
                  }}
                  key={index}
                  ref={inView}
                />
                <StarContainer>
                  {data?.rating?.stars && (
                    <GiRoundStar color={"yellow"} size={"20px"} />
                  )}
                </StarContainer>
              </MovieBox>
            </>
          ))}
        </MoviesWrappler>
      </MoviesSectionWrappler>
      {!hasMorePages && <Footer page={pageName} moviesNumber={movies.length} />}
    </>
  );

  function handleClick(e, movie) {
    if (e.detail === 2) {
      isOneClick = false;
      return twoClicksFunction(movie);
    }
    setTimeout(() => {
      if (isOneClick) {
        oneClickFunction(movie);
      }
      isOneClick = true;
    }, [300]);
  }

  function oneClickFunction(movie) {
    const path = `${location.pathname}?movieId=${movie.id}`;
    navigate(path);
    setMovieId(movie.id);
  }

  function twoClicksFunction(movie) {
    if (!userData.name) {
      return toast.warn(
        "You need to login before adding this movie to your watchlist.",
        {
          theme: "dark",
        }
      );
    }

    postWatchlistMovie(movie.id)
      .then(() => {
        return toast("", {
          icon: (
            <PosterToastIcon
              movieTitle={movie.title}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ),
          theme: "dark",
        });
      })
      .catch((error) => {
        if (error.response.status === 409) {
          return toast.info("This movie is already on watchlist", {
            theme: "dark",
          });
        }
        if (error.response.status === 401) {
          logout();
          return toast.error("Try to re-login", {
            theme: "dark",
          });
        }
      });
  }
  function logout() {
    localStorage.removeItem("userData");
    window.location.reload();
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
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, auto));
    gap: 60px;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, auto));
    gap: 30px;
  }
  @media screen and (max-width: 410px) {
    grid-template-columns: repeat(auto-fit, minmax(125px, auto));
    gap: 10px;
  }
`;

const StarContainer = styled.div`
  position: absolute;
  margin: 5px 30px;
  top: 0;
  right: 0;
`;
