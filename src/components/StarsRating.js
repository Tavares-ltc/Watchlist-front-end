import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDate } from "../helper/dateFormat";
import { Button } from "./Button";
import { Stars } from "./Stars";
import useDeleteRating from "../hooks/api/useDeleteRating";
export function StarsRating({ ratingData, watchlistId }) {
  const [rating, setRating] = useState(0);
  const { deleteRating } = useDeleteRating();
  const date = ratingData?.created_at.split("T")[0];
  const formatedDate = formatDate(date);
  useEffect(() => {
    if (ratingData?.stars) {
      setRating(ratingData.stars);
    }
  }, [ratingData]);

  return (
    <>
      <RatingContainer>
        {rating === 0 && <h3>Saw this movie? Rate it:</h3>}
        <Stars
          rating={rating}
          setRating={setRating}
          watchlistId={watchlistId}
        />
        <h1>{formatedDate}</h1>
        {rating > 0 && ratingData && (
          <Button text={"Unseen"} onClick={() => removeRating(ratingData.id)} />
        )}
      </RatingContainer>
    </>
  );

  function removeRating(ratingId) {
    deleteRating(ratingId);
    window.location.reload();
  }
}

const RatingContainer = styled.div`
  display: flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  h1 {
    color: white;
    font-size: 15px;
    margin: 0 15px;
  }
  h3 {
    font: 20px;
    color: white;
    margin-right: 10px;
  }
  svg {
    cursor: pointer;
  }
`;
