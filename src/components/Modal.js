import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export function Modal({ children, isVisible, closeFunction, ...props }) {
  if (isVisible && !closeFunction) {
    return (
      <ModalContainer {...props}>
        <ModalWrappler {...props}>{children}</ModalWrappler>
      </ModalContainer>
    );
  }
  if (isVisible)
    return (
      <ModalContainer onClick={closeFunction} {...props}>
        <ModalWrappler
          onClick={(event) => {
            event.stopPropagation();
          }}
          {...props}
        >
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
  justify-content: ${(props) =>
    props.justifyContent ? `${props.justifyContent}` : "center"};
  align-items: ${(props) =>
    props.alignItems ? `${props.alignItems}` : "center"};
`;

const ModalWrappler = styled.div`
  filter: drop-shadow(30px 10px 20px #000000);
  width: ${(props) => (props.width ? `${props.width}` : "70vw")};
  height: ${(props) => (props.height ? `${props.height}` : "94vh")};

  border-radius: 20px;
  background-color: #171c25;
  padding: 20px;
  margin: 80px 10%;
  overflow-x: hidden;
  overflow-y: hidden;
  h1 {
    color: #fe6828;
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : "50px")};
  }
  @media screen and (max-width: 900px) {
    overflow-y: scroll;
  }
 
 max-height: fit-content;
`;

const CloseButton = styled.div`
  position: fixed;
  cursor: pointer;
  right: 0;
  top: 0;
  margin-top: 20px;
  margin-right: 20px;
`;
