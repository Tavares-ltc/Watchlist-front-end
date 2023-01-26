import React from "react";
import styled from "styled-components";
import { Modal } from "../../components/modal";
import useMovieDetails from "../../hooks/api/useMovieDetail";
export function MovieDetails({ movieId }) {
  const { details, detailsLoading } = useMovieDetails(movieId);
  if (details?.videos?.results)
    details?.videos?.results.filter(
      (video) => video.name === "Official Trailer"
    );
  if (details)
    return (
      <Modal showModal={movieId}>
        <DetailsModalWrappler>
          <h1>{details?.title}</h1>
          <DetailsContainer>
            <Container>
              <img
                src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
              />
              <TextContainer>
                <h1>Release date:</h1>
                <h2>({details?.release_date})</h2>
              </TextContainer>
            </Container>
            <DetailsWrappler>
              <iframe
                width='640'
                height='430'
                src={`https://www.youtube.com/embed/${(details?.videos?.results[0]?.key)? `${details?.videos.results[0].key}` : "dQw4w9WgXcQ" }`}
              ></iframe>
              {(!details?.videos.results[0].key) && <h3>Sorry there is no video available  &#128546;</h3>}
              <Container>
                <h1>Overview: </h1>
                <h2>{details?.overview}</h2>
              </Container>
            </DetailsWrappler>
          </DetailsContainer>
        </DetailsModalWrappler>
      </Modal>
    );
}

const DetailsModalWrappler = styled.div`
  z-index: 1;
  margin-left: 10px;
  img {
    width: 350px;
    height: auto;
    outline: 10px solid white;
    margin-bottom: 15px;
  }
`;
const DetailsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  height: 100%;
`;
const DetailsWrappler = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  h1 {
    font-size: 20px;
    margin-top: 20px;
    margin-right: 20px;
  }
  h2 {
    font-size: 20px;
    color: white;
  }
  h3 {
    color: #de0f62;
  }
`;

const Container = styled.div`
  h1 {
    font-size: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
  }
  max-width: 640px;
`;

const TextContainer = styled.div`
  display: flex;
  h1 {
    font-size: 20px;
    margin-right: 20px;
  }
  h2 {
    font-size: 20px;
    color: white;
  }
`;
