import React from "react";
import styled from "styled-components";

export function PosterToastIcon({src, movieTitle}) {
  return (
    <ImageIcon>
      <img alt="" src={src} />
      <h1>{movieTitle}, is now on your <b>watchlist</b>!</h1>
    </ImageIcon>
  );
}

const ImageIcon = styled.div`
display: flex;
width: 100%;
  img{
    left: 0;
    width: 90px;
    height: 100px;
    box-sizing: content-box;
  }
  h1 {
    margin-top: 35px;
    text-align: center;
    width: 200px;
    position: absolute;
    margin-left: 80px;
    b {
      color: #de0f62;
    }
  }
`;
