import React, { useState } from "react";
import styled from "styled-components";
import { ImPushpin } from "react-icons/im";
export function MoviePoster({ details }) {
  let isMouseHovering = false;
  const [isMoreDetailsVisible, setIsMoreDetailsVisible] = useState(false);
  const [isMoreDetailsFixed, setIsMoreDetailsFixed] = useState(false);
  let isOneClick = true;

  return (
    <>
      <ImageContainer>
        <img
          src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
          onMouseEnter={handleMouse}
          onMouseLeave={handleLeave}
          onClick={(event) => {
            handleClick(event, details.id);
          }}
        />
        <MoreDetailsContainer
          isVisible={isMoreDetailsVisible || isMoreDetailsFixed}
        >
          <MoreDetails
            isMoreDetailsFixed={isMoreDetailsFixed}
            details={details?.watchProviders?.results}
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

  function handleClick(e, movieId) {
    if (e.detail === 2) {
      isOneClick = false;
      return console.log("filme adicionado a sua watchlist");
    }
    setTimeout(() => {
      if (isOneClick) {
        setIsMoreDetailsFixed(!isMoreDetailsFixed);
      }
      isOneClick = true;
    }, [300]);
  }
}

function MoreDetails({ isMoreDetailsFixed, details }) {
  if (details) {
    return (
      <MoreDetailsWrappler>
        <FixedIcon>
          <ImPushpin color={isMoreDetailsFixed ? "#de0f62" : "white"} />
        </FixedIcon>
        <h1>Watch providers:</h1>
        <Providers providers={details?.US?.rent} />
        <NavBar>
          {details && (
            <h3 onClick={() => window.open(details.US?.link)}>Know more...</h3>
          )}
          <h3>Add to Watchlist +</h3>
        </NavBar>
      </MoreDetailsWrappler>
    );
  }
}

function Providers({ providers }) {
  if (providers) {
    return (
      <ProvidersContainer>
        {providers.map((provider, index) => (
          index < 6 && <img
            src={"https://image.tmdb.org/t/p/w500" + provider.logo_path}
          ></img>
        ))}
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
`;
