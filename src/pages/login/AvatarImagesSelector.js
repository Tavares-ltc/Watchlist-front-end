import React from "react";
import styled from "styled-components";

export function AvatarImagesSelector({ children, userImage, setUserImage }) {
  const avatarImages = [
    "https://www.santos.sp.gov.br/static/files_www/styles/newspagesimples/public/field/image/poderoso.jpg?itok=ZXXKZWXw",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAmjY9vlruNcBuB3TOxImReYI2u0caCxzrTw&usqp=CAU",
    "https://images.saymedia-content.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc0NDk0NjQ4NDQ4ODUzMzUy/50-best-female-movie-character-names-of-all-time.jpg",
    "https://www.carnevale.venezia.it/wp-content/uploads/2020/02/shining-2-1680x1050.png",
    "https://i.pinimg.com/236x/c5/c2/f1/c5c2f175e93660a2be1107addb14ab5f--movie-characters-female-characters.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEu1o93lASCsJ-igxtWh3A8opTqwIAvqv6Fx9hh7GDOWSYyJL6kZdrY1MXmRYB_Okh2ao&usqp=CAU",
  ];

  return (
    <AvatarWrappler setUserImage={setUserImage} userImage={userImage}>
      {children}
      <ImagesContainer>
        {avatarImages.map((imgSrc, index) => (
          <ImageStyle key={index} isSelected={imgSrc === userImage}>
            <img
              onClick={() => {
                setUserImage(imgSrc);
              }}
              src={imgSrc}
            ></img>
          </ImageStyle>
        ))}
      </ImagesContainer>
    </AvatarWrappler>
  );
}

const AvatarWrappler = styled.div`
  height: 120px;
  width: fit-content;
  background-color: grey;
  border-radius: 10px;
  @media screen and (max-width: 750px) {
    width: 50vw;
    flex-wrap: wrap;
    max-height: unset;
    height: fit-content;
    margin-bottom: 30px;
  }
`;

const ImagesContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
    max-height: unset;
    height: fit-content;
  }
`;

const ImageStyle = styled.div`
  img {
    outline: ${(props) =>
      props.isSelected ? "3px solid #de0f62" : "3px solid #c0c0c0"};
    width: 55px;
    height: 55px;
    border-radius: 40px;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
