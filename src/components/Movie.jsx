import React, { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Auth } from "../context/AuthContext";
const Movie = ({ movie }) => {
  const { user } = useContext(Auth);
  const [like, setLike] = useState(false);

  const [saved, setSaved] = useState(false);

  // console.log(user);

  const movieID = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          image: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please Log in to save a movie");
    }
  };

  return (
    <div className=" w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
        alt={movie.title}
      />
      <div className="absolute w-full h-full left-0 top-0 hover:bg-black/80 opacity-0 hover:opacity-100">
        <p className=" text-white whitespace-normal text-center flex items-center justify-center h-full w-full text-xs md:text-sm lg:text-lg">
          {movie.title}
        </p>
        <p className=" absolute top-[5%] left-[5%]" onClick={saveShow}>
          {like ? <FaHeart color="white" /> : <FaRegHeart color="white" />}
        </p>
      </div>
    </div>
  );
};

export default Movie;
