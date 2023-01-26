import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <>
      <HeaderWrappler>
        <h1>Watchlist</h1>
      </HeaderWrappler>
    </>
  );
}

const HeaderWrappler = styled.div`
  width: 100%;
  height: 60px;
  position:fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 2px 20px;
  display: flex;
  align-items: center;
  background-color: #171c25;
  z-index: 1;
  filter: drop-shadow(30px 10px 20px #0c0a016d);

  h1 {
    color: #de0f62 ;
    font-size: 46px;
    cursor: pointer;
    mix-blend-mode: lighten;
    background-image: linear-gradient(to right, #de0f62 , #fe6828);
    -webkit-background-clip: text;
    color: transparent;
  }
`;
