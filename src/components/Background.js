import React from "react";
import styled from "styled-components";

export function Background({ children }) {
  return <BackgroundWrappler>{children}</BackgroundWrappler>;
}

const BackgroundWrappler = styled.div`
  height: 100%;
  max-width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #000f17;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;
