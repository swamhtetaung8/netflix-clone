import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Auth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(Auth);
  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" my-10">
      <h2 className=" text-white p-4 md:text-xl font-bold">My Shows</h2>
      <div className="group relative flex items-center">
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className=" w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.image}`}
                alt={movie.title}
              />
              <div className="absolute w-full h-full left-0 top-0 hover:bg-black/80 opacity-0 hover:opacity-100">
                <p className=" text-white whitespace-normal text-center flex items-center justify-center h-full w-full text-xs md:text-sm lg:text-lg">
                  {movie.title}
                </p>
                <p onClick={() => deleteShow(movie.id)}>
                  <AiOutlineClose
                    className=" absolute top-2 right-2"
                    color="white"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
        <FiArrowLeft
          onClick={slideLeft}
          className=" group-hover:block absolute text-white bg-gray-500 opacity-70 text-4xl hidden  left-0 cursor-pointer mx-3 rounded-full z-40 hover:opacity-100"
        />
        <FiArrowRight
          onClick={slideRight}
          className=" group-hover:block absolute text-white bg-gray-500 opacity-70 text-4xl hidden  right-0 cursor-pointer mx-3 rounded-full z-40 hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default SavedShows;
