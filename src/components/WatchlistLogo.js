import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function WatchlistLogo({ size }) {
  const navigate = useNavigate();

  const urlPathName = window.location.pathname.toString();
  const pageName = urlPathName.split("/")[1];

  return (
    <>
      <LogoWrappler
        size={size}
        onClick={() =>
          pageName === "watchlist"
            ? navigate("/discover")
            : navigate("/watchlist")
        }
      >
        <h6>Watchlist</h6>
      </LogoWrappler>
    </>
  );
}

const LogoWrappler = styled.div`
  width: fit-content;
  h6 {
    font-size: ${(props) => (props.size ? `${props.size}` : "46px")};
    cursor: pointer;
    mix-blend-mode: lighten;
    background-image: linear-gradient(to right, #de0f62, #fe6828);
    -webkit-background-clip: text !important;
    color: transparent !important;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
  @media screen and (max-width: 750px) {
    h6 {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 410px) {
    h6 {
      font-size: 20px;
    }
  }
  
  
  z-index: 1;
`;
