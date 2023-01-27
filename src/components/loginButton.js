import React from "react";
import styled from "styled-components";

export function LoginButton() {
  return (
    <>
      <ButtonWrappler>
        <h3>LOGIN</h3>
      </ButtonWrappler>
    </>
  );
}

const ButtonWrappler = styled.div`
  background-color: #000f17;
  outline: 3px solid #fe6828;
  width: 70px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  h3 {
    margin: 0;
    color: white;
    font-size: 16px;
  }
  &:hover {
    transition: all 1s;
    outline: 3px solid #de0f62;
  }
`;
