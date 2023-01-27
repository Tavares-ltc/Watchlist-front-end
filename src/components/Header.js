import React from "react";
import styled from "styled-components";
import { LoginButton } from "./LoginButton";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrappler>
        <h1>Watchlist</h1>
        <NavBar>
          <h2
            onClick={() => {
              navigate("/discover");
              window.location.reload();
            }}
          >
            Discover
          </h2>
          <h2
            onClick={() => {
              navigate("/popular");
              window.location.reload();
            }}
          >
            Popular
          </h2>
          <h2
            onClick={() => {
              navigate("/nowplaying");
              window.location.reload();
            }}
          >
            Now Playing
          </h2>
          <h2
            onClick={() => {
              navigate("/upcoming");
              window.location.reload();
            }}
          >
            Upcoming
          </h2>
          <h2 onClick={() => {
              navigate("/toprated");
              window.location.reload();
            }}>
            Top Rated
          </h2>
        </NavBar>
        <SearchBar>
          <input placeholder='Search...' />
          <IconWrappler>
            <BsSearch />
          </IconWrappler>
        </SearchBar>
        <ConfigBar>
          <h2>en-US</h2>
          <LoginButton />
        </ConfigBar>
      </HeaderWrappler>
    </>
  );
}

const HeaderWrappler = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;

  padding: 2px 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #171c25;
  z-index: 1;
  filter: drop-shadow(30px 10px 20px #0c0a016d);

  h1 {
    color: #de0f62;
    font-size: 46px;
    cursor: pointer;
    mix-blend-mode: lighten;
    background-image: linear-gradient(to right, #de0f62, #fe6828);
    -webkit-background-clip: text;
    color: transparent;
  }

  h2 {
    font-size: 16px;
  }
`;

const NavBar = styled.div`
  display: flex;
  margin: 0 30px;
  h2 {
    color: white;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      color: #de0f62;
    }
  }
`;
const SearchBar = styled.div`
    position: relative;
  input {
    all: unset;
    background-color: white;
    padding: 6px 30px 6px 20px;
    height: 40px;
    width: 290px;
    font-size: 18px;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    border-radius: 8px;
    outline: none;
    box-sizing: border-box;
  }
`;
const ConfigBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    color: white;
    margin-right: 15px;
    margin-bottom: 0px;
    cursor: pointer;
  }
`;

const IconWrappler = styled.div`
position: absolute;
right: 0;
top: 0;
margin-top: 10px;
margin-right: 8px;
`
