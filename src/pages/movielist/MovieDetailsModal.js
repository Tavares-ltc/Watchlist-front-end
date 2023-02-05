import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import { Modal } from "../../components/Modal";
import useMovieDetails from "../../hooks/api/useMovieDetails";
import { MoviePoster } from "./MoviePoster";

export function MovieDetails({ movieId, setMovieId }) {
  const { getMovieDetails } = useMovieDetails({});
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    async function fechMovieData(movieId) {
      const movieData = await getMovieDetails(movieId);
      return setDetails(movieData);
    }
    if (movieId) {
      fechMovieData(movieId);
      setLoading(true);
      setIsVisible(true);
      setTimeout(() => {
        setLoading(false);
      }, [1200]);
    }
  }, [movieId]);

  if (loading) {
    return (
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <LoadingContainer>
          <SyncLoader color='#de0f62' />
        </LoadingContainer>
      </Modal>
    );
  }

  return (
    <Modal isVisible={isVisible} closeFunction={closeModal}>
      <DetailsModalWrappler>
        <h1>{details?.title}</h1>
        <DetailsContainer>
          <Container>
            <MoviePoster details={details} />
            <TextContainer>
              <h1>Release date:</h1>
              <h2>({releaseDate(details?.release_date)})</h2>
            </TextContainer>
          </Container>
          <DetailsWrappler>
            {videoTrailer(details?.videos?.results[0]?.key)}
            <Overview>
              <h1>Overview: </h1>
              <OverviewText overview={details?.overview} />
            </Overview>
          </DetailsWrappler>
        </DetailsContainer>
      </DetailsModalWrappler>
    </Modal>
  );

  function videoTrailer(key) {
    const defaultKey = "dQw4w9WgXcQ";
    const youtubeEndpoint = "https://www.youtube.com/embed/";

    if (key) {
      return <iframe width='640' height='430' src={youtubeEndpoint + key} />;
    }

    if (!key) {
      return (
        <>
          <iframe width='640' height='430' src={youtubeEndpoint + defaultKey} />
          <h3>Sorry, no trailer for this movie was found 😟</h3>;
        </>
      );
    }
  }

  function closeModal() {
    setIsVisible(false);
    setMovieId();
    setDetails();
    const url = window.location.toString();
    const urlWithoutQuery = url.split("?")[0];
    window.history.replaceState("","", urlWithoutQuery)
  }
}

function releaseDate(date, format = "en-Us") {
  if (date) {
    const arrDate = date.split("-");

    if (format === "pt-BR") return `${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`;
    return `${arrDate[1]}/${arrDate[2]}/${arrDate[0]}`;
  }
}

function OverviewText({ overview }) {
  if (overview) return <h2>{overview}</h2>;
  if (!overview) return <h2>This movie doesn't have a overview yet.</h2>;
}

const DetailsModalWrappler = styled.div`
  z-index: 1;
  img {
    width: 365px;
    height: auto;
    outline: 10px solid white;
    margin-bottom: 15px;
    margin: 10px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
`;
const DetailsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  height: 90%;
`;
const DetailsWrappler = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  margin-left: 40px;
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
const Overview = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
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
  max-height: 170px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
