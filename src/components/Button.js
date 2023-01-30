import React from "react";
import styled from "styled-components";
export function Button({ onClick, text, ...props }) {
  return (
    <>
      <ButtonWrappler {...props}>
        <button onClick={onClick}>
          <h3>{text}</h3>
        </button>
      </ButtonWrappler>
    </>
  );
}

const ButtonWrappler = styled.div`
  background-color: #000f17;
  outline: 3px solid #fe6828;
  width: ${(props) => (props.width ? `${props.width}` : "70px")};
  height: ${(props) => (props.height ? `${props.height}` : "30px")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  button {
    all:unset;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      margin: 0;
      color: white;
      text-decoration: none;
      font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : "16px")};
    }
  }
  &:hover {
    transition: all 1s;
    outline: 3px solid #de0f62;
  }
`;
