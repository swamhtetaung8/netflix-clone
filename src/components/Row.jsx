import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Movie from "./Movie";
const Row = ({ title, fetchUrl, rowId }) => {
  const [movies, setMovies] = useState([]);
  const getPopularMovies = async () => {
    const data = await axios.get(fetchUrl);
    setMovies(data.data.results);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  // console.log(movies);
  return (
    <div className="">
      <h2 className=" text-white p-4 md:text-xl font-bold">{title}</h2>
      <div className="group relative flex items-center">
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
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

export default Row;
