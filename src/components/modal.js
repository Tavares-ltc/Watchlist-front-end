import React, { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export function Modal({ showModal, children }) {
  const [isVisible, setIsVisible] = useState(showModal);

  if (isVisible)
    return (
      <ModalContainer onClick={() => setIsVisible(false)}>
        <ModalWrappler>
          <CloseButton>
            <IoMdClose color='white' size={"20px"} onClick={()=> {setIsVisible(false)}} />
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
  width: 120vh;
  height: 70vh;
  border-radius: 20px;
  background-color: #171c25;
  padding: 20px;
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
