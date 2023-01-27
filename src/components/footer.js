import React from "react";
import styled from "styled-components";

export function Footer() {
  return (
    <FooterWrappler>
      <h2>It looks like you've reached the end of that tab 😨</h2>
      <h2>But you can look for more movies in the others tabs 😎</h2>
      <h1>Developed by:</h1>
      <h2 > <a href={"https://github.com/Tavares-ltc"}>https://github.com/Tavares-ltc</a></h2>
    </FooterWrappler>
  );
}

const FooterWrappler = styled.div`
  height: 300px;
  min-width: 100vw;
  width: 100%;
  background-color: #171c25;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 25px;
    color: #de0f62;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 25px;
    color: white;
    cursor: pointer;
    margin-bottom: 15px;
  }
`;
