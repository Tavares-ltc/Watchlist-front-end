import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ImMenu3 } from "react-icons/im";
import useWidth from "../hooks/useWidth";
export function CategoriesNavBar() {
  const navigate = useNavigate();
  const [width] = useWidth();
  const [showMobileNavBar, setShowMobielNavBar] = useState(false);
  if (width < 1230) {
    return (
      <>
        <NavBarMobile isVisible={showMobileNavBar}>
          <ImMenu3
            color={showMobileNavBar ? "#de0f62" : "white"}
            size={width > 758 ? "50px" : "40px"}
            onClick={() => setShowMobielNavBar(!showMobileNavBar)}
          />
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
                navigate("/now_playing");
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
            <h2
              onClick={() => {
                navigate("/top_rated");
                window.location.reload();
              }}
            >
              Top Rated
            </h2>
          </NavBar>
        </NavBarMobile>
      </>
    );
  }

  return (
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
          navigate("/now_playing");
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
      <h2
        onClick={() => {
          navigate("/top_rated");
          window.location.reload();
        }}
      >
        Top Rated
      </h2>
    </NavBar>
  );
}

const NavBar = styled.div`
  display: flex;
  margin: 0 30px;
  h2 {
    &:first-of-type {
      margin-left: 5px;
    }
    color: white;
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      color: #de0f62;
    }
  }
`;

const NavBarMobile = styled.div`
  margin: 0 20px;
  svg {
    cursor: pointer;
  }
  div:nth-child(2) {
    margin-top: 2px !important;
    position: fixed;
    background-color: #12151c;
    outline: white;
    height: ${(props) => (props.isVisible ? "fit-content" : "0px")};
    padding: ${(props) => (props.isVisible ? "5px" : "0px")};
    overflow: hidden;
    min-width: 100%;

    right: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    transition: all ease-out 1s;
    @media screen and (max-width: 480px) {
      h2 {
        font-size: 13px;
      }
    }
  }
`;
