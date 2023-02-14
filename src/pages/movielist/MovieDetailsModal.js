import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import { Modal } from "../../components/Modal";
import { StarsRating } from "../../components/StarsRating";
import useMovieDetails from "../../hooks/api/useMovieDetails";
import useWidth from "../../hooks/useWidth";
import { MoviePoster } from "./MoviePoster";

export function MovieDetails({ movieId, setMovieId }) {
  const { getMovieDetails } = useMovieDetails({});
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [width] = useWidth();

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
        <ContentWrappler>
          <LeftSide>
            <MoviePoster details={details} />
            <TextContainer>
              <h1>Release date:</h1>
              <h2>({releaseDate(details?.release_date)})</h2>
            </TextContainer>
            {details?.watchlist_id && (
              <StarsRating
                ratingData={details.rating}
                watchlistId={details.watchlist_id}
              />
            )}
          </LeftSide>
          <RightSide>
            {videoTrailer(details?.videos?.results[0]?.key)}
            <Overview>
              <h1>Overview: </h1>
              <OverviewText overview={details?.overview} />
            </Overview>
          </RightSide>
        </ContentWrappler>
      </DetailsModalWrappler>
    </Modal>
  );

  function videoTrailer(key) {
    const defaultKey = "dQw4w9WgXcQ";
    const youtubeEndpoint = "https://www.youtube.com/embed/";

    if (key) {
      return <iframe src={youtubeEndpoint + key} />;
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
    window.history.replaceState("", "", urlWithoutQuery);
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

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailsModalWrappler = styled.div`
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 40px 20px;
  h1 {
    pointer-events: none;
  }
  @media screen and (max-width: 900px) {
   text-align: center;
   height: fit-content;
   h1 {
    font-size: 30px;
   }
  }
  @media screen and (max-width: 550px) {

   h1 {
    font-size: 20px;
   }
  }
`;
const ContentWrappler = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 89%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    width: fit-content;
    gap: 40px;
  }
`;
const LeftSide = styled.div`
  min-width: fit-content;
  width: 30vw;
  overflow-x: hidden;
  

  img {
    width: 23vw;
    max-width: 350px;
    margin: 10px;
    outline: 10px solid white;
    margin-bottom: 15px;
    margin: 10px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    
  }
  @media screen and (max-width: 900px) {
    width: fit-content;
    overflow: unset;
    img{
      width: 60vw;
      max-width: unset;
    }
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
  @media screen and (max-width: 1000px) {
    display: block;
  }
  @media screen and (max-width: 900px) {
    display: flex;
  }
  @media screen and (max-width: 550px) {
    display: block;
  }
`;
const RightSide = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  height: 100%;
  margin-left: 10px;
  iframe {
    flex-wrap: wrap;
    width: 35vw;
    height: 25vw;
    max-width: 640px;
    max-height: 460px;
    margin-bottom: 20px;
  }
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
  @media screen and (max-width: 900px) {
    align-items: center;
    width: 60vw;
    height: fit-content;
    iframe {
      width: 70vw;
      height: 45vw;
    }
    margin-bottom: 30px;
  }
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
  overflow-y: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 900px) {
   overflow: unset;
   max-height: unset;
   height: fit-content;
  }
  
`;
