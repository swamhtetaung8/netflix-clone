import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Auth } from "../context/AuthContext";
import requests from "../Requests";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const Main = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(Auth);
  const movieID = doc(db, "users", `${user?.email}`);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  const [mainSaved, setMainSaved] = useState(false);
  const saveShow = async () => {
    if (user?.email) {
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          image: movie.backdrop_path,
        }),
      });
      // setMainSaved(true);
    } else {
      alert("Please Log in to save a movie");
    }
  };
  // console.log(movie);
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
    <div className="w-full lg:h-[750px] h-[500px] text-white">
      <div className=" w-full h-full relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-[#00000090] via-[#00000090]"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className=" w-full h-full object-cover"
        />
        <div className=" absolute top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="flex gap-4 my-4 md:my-10">
            <button className=" bg-gray-200 text-black border py-2 px-5">
              Play
            </button>
            <button
              onClick={saveShow}
              className=" text-white border-white border py-2 px-5 active:scale-105">
              {mainSaved ? "Saved" : "Watch Later"}
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
