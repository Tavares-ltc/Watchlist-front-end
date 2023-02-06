import React from "react";
import { SyncLoader } from "react-spinners";
import { Background } from "./Background";
import styled from "styled-components";

import Header from "./Header";

export function PageLoading() {
  return (
    <>
      <Background>
        <Header />
        <LoadingContainer>
          <SyncLoader color='#de0f62' />
        </LoadingContainer>
      </Background>
    </>
  );
}

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
