import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];
  console.log(movie);
  const getPopularMovies = async () => {
    const data = await axios.get(requests.requestPopular);
    setMovies(data.data.results);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-[550px] text-white">
      <div className=" w-full h-full relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-[#00000090] via-[#00000090]"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className=" w-full h-full object-cover"
        />
        <div className=" absolute top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="flex gap-4 my-4">
            <button className=" bg-gray-200 text-black border py-2 px-5">
              Play
            </button>
            <button className=" text-white border-white border py-2 px-5">
              Watch Later
            </button>
          </div>
          <p>Released: {movie?.release_date}</p>
          <p className=" w-full md:max-w-[75%] lg:max-w-[50%] xl:max-w-[35%]">
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
