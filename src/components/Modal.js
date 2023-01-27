import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export function Modal({ children, isVisible, setIsVisible, setMovieId }) {
  
  if (isVisible)
    return (
      <ModalContainer onClick={closeModal}>
        <ModalWrappler onClick={(event) => {event.stopPropagation()}}>
          <CloseButton>
            <IoMdClose color='white' size={"20px"} onClick={closeModal} />
          </CloseButton>
          {children}
        </ModalWrappler>
      </ModalContainer>
    );


    function closeModal(){
      setIsVisible(false)
      setMovieId()
    }
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
  width: 1250px;
  height: 780px;
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
