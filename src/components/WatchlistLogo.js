import React from "react";
import styled from "styled-components";

export function WatchlistLogo({size}) {
  return (
    <>
      <LogoWrappler size={size}>
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
  z-index: 1;
`;
