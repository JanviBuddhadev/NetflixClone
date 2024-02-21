import React from "react";
import { IMG_CDN } from "../Utils/constants";

const MovieCard = ({ posterPath }) => {
  //console.log("Poster Path",IMG_CDN+posterPath);
  return (
    <div className="w-48 pr-4 pt-2 h-56 cursor-pointer">
      <img
        className="rounded-md"
        alt="Some error in loading poster of a movie"
        src={IMG_CDN + posterPath}
      />
    </div>
  );
};

export default MovieCard;
