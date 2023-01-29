import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export function Modal({ children, isVisible, closeFunction, ...props}) {
  if(isVisible && !closeFunction){

    return (
      <ModalContainer>
        <ModalWrappler>
          {children}
        </ModalWrappler>
      </ModalContainer>
    );
  }
  if (isVisible)
    return (
      <ModalContainer onClick={closeFunction}>
        <ModalWrappler onClick={(event) => {event.stopPropagation()}} {...props}>
          <CloseButton>
            <IoMdClose color='white' size={"20px"} onClick={closeFunction} />
          </CloseButton>
          {children}
        </ModalWrappler>
      </ModalContainer>
    );
}
const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1;
  background-color: rgba(17, 17, 17, 0.23);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrappler = styled.div`
  filter: drop-shadow(30px 10px 20px #000000);
  width: ${props => props.width? `${props.width}` : "1250px"};
  height: ${props => props.heigth? `${props.heigth}` : "780px"};
  border-radius: 20px;
  background-color: #171c25;
  padding: 30px 60px;
  h1 {
    color: #fe6828;
    font-size: 50px;
  }
`;

const CloseButton = styled.div`
position: fixed;
cursor: pointer;
right: 0;
top: 0;
margin-top: 20px;
margin-right: 20px;
`
