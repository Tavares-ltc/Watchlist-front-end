import React, { useState } from "react";
import styled from "styled-components";
import { ImPushpin } from "react-icons/im";
import useAddWatchlist from "../../hooks/api/useAddWatchlist";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { PosterToastIcon } from "../../components/PosterToastIcon";
import useRemoveWatchlistMovie from "../../hooks/api/useRemoveFromWatchlist";
export function MoviePoster({ details }) {
  const { userData } = useContext(AuthContext);

  const [isMoreDetailsVisible, setIsMoreDetailsVisible] = useState(false);
  const [isMoreDetailsFixed, setIsMoreDetailsFixed] = useState(false);
  let isMouseHovering = false;

  const { postWatchlistMovie } = useAddWatchlist();
  const { removeWatchlistMovie } = useRemoveWatchlistMovie();
  const urlPathName = window.location.pathname.toString();
  let isOneClick = true;
  return (
    <>
      <ImageContainer>
        <img
          src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
          onMouseEnter={handleMouse}
          onMouseLeave={handleLeave}
          onClick={(event) => {
            handleClick(event, details);
          }}
        />
        <MoreDetailsContainer
          isVisible={isMoreDetailsVisible || isMoreDetailsFixed}
        >
          <MoreDetails
            isMoreDetailsFixed={isMoreDetailsFixed}
            setIsMoreDetailsFixed={setIsMoreDetailsFixed}
            details={details?.watchProviders?.results}
            watchlistId={details?.watchlist_id}
            addWatchlist={() => twoClicksFunction(details)}
            removeFromWatchlist={() => {
              removeWatchlistMovie(details.id).then(() => {
                window.location.reload();
              });
            }}
          />
        </MoreDetailsContainer>
      </ImageContainer>
    </>
  );

  function handleLeave() {
    isMouseHovering = false;
    setTimeout(() => {
      isMouseHovering = true;
      setIsMoreDetailsVisible(false);
    }, [300]);
  }
  function handleMouse() {
    isMouseHovering = true;
    setTimeout(() => {
      if (isMouseHovering) {
        setIsMoreDetailsVisible(true);
      }
    }, [400]);
  }

  function handleClick(e, movie) {
    if (e.detail === 2) {
      isOneClick = false;
      return twoClicksFunction(movie);
    }
    setTimeout(() => {
      if (isOneClick) {
        oneClickFunction();
      }
      isOneClick = true;
    }, [300]);
  }

  function oneClickFunction() {
    setIsMoreDetailsFixed(!isMoreDetailsFixed);
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
    if (urlPathName === "/watchlist") {
      return alert("You are already on watchlist");
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
        if (error.response.status == 409) {
          return toast.info("This movie is already on watchlist", {
            theme: "dark",
          });
        }
        if (error.response.status == 401) {
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

function MoreDetails({
  isMoreDetailsFixed,
  setIsMoreDetailsFixed,
  details,
  addWatchlist,
  removeFromWatchlist,
  watchlistId,
}) {
  if (details) {
    return (
      <MoreDetailsWrappler>
        <FixedIcon onClick={() => setIsMoreDetailsFixed(!isMoreDetailsFixed)}>
          <ImPushpin color={isMoreDetailsFixed ? "#de0f62" : "white"} />
        </FixedIcon>
        <h1>Watch providers:</h1>
        <Providers providers={details?.US?.rent} />
        <NavBar>
          {details && (
            <h3 onClick={() => window.open(details.US?.link)}>Know more...</h3>
          )}
          {watchlistId ? (
            <h3 onClick={removeFromWatchlist}>Remove from watchlist -</h3>
          ) : (
            <h3 onClick={addWatchlist}>Add to Watchlist +</h3>
          )}
        </NavBar>
      </MoreDetailsWrappler>
    );
  }
}

function Providers({ providers }) {
  if (providers) {
    return (
      <ProvidersContainer>
        {providers.map(
          (provider, index) =>
            index < 6 && (
              <img
                src={"https://image.tmdb.org/t/p/w500" + provider.logo_path}
              ></img>
            )
        )}
      </ProvidersContainer>
    );
  }
  if (!providers) {
    return <h2>Sorry, no providers found</h2>;
  }
}

const MoreDetailsContainer = styled.div`
  width: 365px;
  transition: linear 0.5s;
  position: absolute;
  background-color: rgba(42, 41, 41, 0.899);
  height: ${(props) => (props.isVisible ? `250px` : "0px")};
  bottom: 0;
  margin: 10px;
  overflow: hidden;
  &:hover {
    height: 250px;
  }
`;
const ImageContainer = styled.div`
  position: relative;
  width: 385px;
  img {
    cursor: pointer;
  }
`;
const MoreDetailsWrappler = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  h1 {
    color: white;
    text-align: center;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
const ProvidersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 250px;
  img {
    width: 50px;
    max-width: 50px;
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  h3 {
    color: red;
    font-size: 18px;
    margin: 10px;
    cursor: pointer;
    z-index: 1;
    &:nth-of-type(1) {
      text-align: start;
      color: white;
    }
    &:nth-of-type(2) {
      color: #de0f62;
      text-align: end;
    }
  }
`;
const FixedIcon = styled.div`
  position: absolute;
  right: 0;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
`;
