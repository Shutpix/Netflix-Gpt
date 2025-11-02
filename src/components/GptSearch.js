import React from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { NETFLIX_BG } from "../utils/constants";


const  GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          src = { NETFLIX_BG }
          alt="logo"
        />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  );
};

export default GptSearch;
