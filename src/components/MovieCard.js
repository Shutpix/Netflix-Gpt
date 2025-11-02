import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4 transform transition-transform duration-300 ease-in-out hover:scale-125 hover:z-20 hover:shadow-2xl">
      <img
        alt="Movie card"
        src={IMG_CDN_URL + posterPath}
        className="rounded-md w-full"
      />
    </div>
  );
};

export default MovieCard;
