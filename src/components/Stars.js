import { useState } from "react";
import { GiRoundStar } from "react-icons/gi";
import useRateMovie from "../hooks/api/useRateMovie";

export function Stars({ rating, watchlistId, setRating }) {
  const { postRateMovie } = useRateMovie();
  const stars = [];
  const [starsHovering, setStarsHovering] = useState(0);
  for (let i = 1; i <= 5; i++) {
    if (i <= rating)
      stars.push(
        <GiRoundStar
          alt=''
          color='yellow'
          size={"30px"}
          onClick={() => rate(watchlistId, i)}
        />
      );
    if (i > rating)
      stars.push(
        <GiRoundStar
          color={i < starsHovering ? "yellow" : "white"}
          size={"30px"}
          onMouseOver={() => setStarsHovering(i + 1)}
          onMouseOut={() => setStarsHovering(0)}
          onClick={() => rate(watchlistId, i)}
        />
      );
  }
  return stars;

  function rate(watchlistId, stars) {
    if (rating > 0) {
    }
    postRateMovie(watchlistId, stars)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
